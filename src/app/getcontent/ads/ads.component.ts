import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StoreService} from "../../store.service";
import {AppComponent} from "../../app.component";
import {ActivatedRoute, Params} from "@angular/router";
import {JsonService} from "../../json-service.service";

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit, AfterViewInit {

  adListDivTable = true;
  pageLimit = 10;
  pageLimitArray = ["10", "20", "30"];
  showPreviewPopup = false;
  showmetadata = false;
  showResponsiveDiv = false;
  loadScript;
  bannerId;
  width;
  height;
  format;
  adName;
  adImpTracker;
  adClickTracker;
  showAdNameWarning = false;
  showAdWidthWarning = false;
  showAdHeightWarning = false;
  showScriptDiv = false;
  auxHeight;
  auxWidth;
  showLoadScript;
  showPxWidth = false;
  showPxHeight = false;
  copySuccess;
  copyMsg;
  copyFail;
  initialState;
  constructor(public store: StoreService, private app: AppComponent, private activatedRoute: ActivatedRoute, private json: JsonService) { }

  ngAfterViewInit(){
    /*this.store.heightlightAd();
    console.log(document.getElementById('adsInidicator'));*/
    this.store.showComponent = true;
    this.store.showLoadingIcon = false;
    this.app.heightlightAd();

  }

  ngOnInit() {
    this.store.showMarketOptions = true;
    this.store.showComponent = false;
    this.store.showLoadingIcon = true;
    if(this.store.market === undefined) {

      const sidebar: any = document.getElementById('sidebar-markets');
      sidebar.click();

      this.activatedRoute.params.subscribe((params: Params) => {
        this.store.marketId = params['id'];
        this.json.getJSON(this.store.serverName + '/FeedServlet?marketId=' + this.store.marketId)
          .subscribe(response => {
            if(response.length < 1) {
              this.store.showFeedEmptyError = true;
            }else{
              this.json.getJSON(this.store.serverName + '/Market?marketId=' + this.store.marketId)
                .subscribe(response => {
                  this.store.market = response[0];
                  this.store.marketName = this.store.market.name;
                  this.store.marketDescription = this.store.market.description;

                  this.json.getJSON(this.store.adServerUrl + "/getBannerList?publisherId="+89+"&tag=Scout24-custom&tag=" + this.store.marketId )
                    .subscribe(response => {
                      this.store.adList = response;
                      console.log(response);

                      if(this.store.adList.length > 0){
                        this.store.adListDiv = true;
                        this.store.noAdWarning = false;
                      }else{
                        this.store.noAdWarning = true;
                      }
                      const _localThis = this;
                      this.store.adList.forEach(function (obj) {
                        obj["formatName"] = _localThis.store.adFormatsToCreate[0].name;
                        obj["launchReturnJson"] = JSON.parse(obj["launchReturnJson"]);

                        // Find width height from loadscript, if not exist use width height that is provided otherwise use width height from script
                        const loadScript = obj["launchReturnJson"]["loadScript"];

                        // Parse out width and height from loadScript atm only the transformer has this value in the loadscript
                        const pattern = /(\{.+?})/g; // parse the object containing the width and height
                        if(loadScript !== undefined && loadScript !== null && loadScript !== "undefined") {
                          const res = pattern.exec(loadScript);

                          if (res !== null && res !== undefined) {

                            const result = res[0]; // pick the object that has been parsed

                          /*  pattern = /(\'.+?')/g; // pattern for obtaining the width and height from the object
                            const values = pattern.exec(result); // parse the object for obtaining width and height*/
                            /*  console.log(result);*/

                         /*   if (values !== null || values !== undefined) {
                           /!*   console.log(values);*!/
                              obj["width"] = values[0].replace(/\'/g,""); // set the width, parses the '' that surrounds the value
                              obj["height"] = values[1].replace(/\'/g,""); // set the height
                            } */
                            const resSplit = result.split("'");
                            if (resSplit !== null || resSplit !== undefined) {
                           /*   console.log(values);*/
                              obj["width"] = resSplit[1]; // set the width, parses the '' that surrounds the value
                              obj["height"] = resSplit[3]; // set the height
                            }
                          }
                        }
                      });
                      this.store.showLoadingIcon = false;
                      this.store.showComponent = true;
                    });
                });
            }

          });

      });
    }
  }


  getAds(mark){ // Mark if a ad has been created
    this.json.getJSON(this.store.adServerUrl + "/getBannerList?publisherId="+89+"&tag=Scout24-custom&tag=" + this.store.marketId )
      .subscribe(response => {
        this.store.adList = response;

        if(this.store.adList.length > 0){
          this.store.noAdWarning = false;
        }
        const _localThis = this;
        this.store.adList.forEach(function (obj) {
          obj["formatName"] = _localThis.store.adFormatsToCreate[0].name;
          obj["launchReturnJson"] = JSON.parse(obj["launchReturnJson"]);




          // Find width height from loadscript, if not exist use width height that is provided otherwise use width height from script
          const loadScript = obj["launchReturnJson"]["loadScript"];

          // Parse out width and height from loadScript atm only the transformer has this value in the loadscript
          let pattern = /(\{.+?})/g; // parse the object containing the width and height
          if(loadScript !== undefined && loadScript !== null && loadScript !== "undefined") {
            const res = pattern.exec(loadScript);

            if (res !== null && res !== undefined) {

              const result = res[0]; // pick the object that has been parsed

              pattern = /(\'.+?')/g; // pattern for obtaining the width and height from the object
              const values = pattern.exec(result); // parse the object for obtaining width and height

              if (values !== null || values !== undefined) {
                obj["width"] = values[0].replace(/\'/g,""); // set the width, parses the '' that surrounds the value
                obj["height"] = values[1].replace(/\'/g,""); // set the height
              }
            }
          }

        });



                  if(mark){
                    this.hidePreviewPopup();
                    this.store.createAdDiv = false;
                    this.store.adListDiv = true;
                    const _localThis = this;  // MOVE THIS PART TO GETADS(); SEND A PARAMTER GETADS(TRUE) IF TRUE IT SHOULD HIGHTLIGHT OTHERWISE NOT
                    setTimeout(function () {
                      const tr: any = document.getElementById(_localThis.bannerId);
                      if(tr !== null) {
                        tr.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
                      }
                    }, 1500);
                  }

            this.initialState = this.store.adList;

            /*If no ads has been created show warning (info) message, otherwise show the created ads*/
            if(this.store.adList.length < 1){
              this.store.noAdWarning = true;
            }else{
              this.store.adListDiv = true;
            }

          });

  }


  create(){
    this.store.adListDiv = false;
    this.store.noAdWarning = false;
    this.store.createAdDiv = true;
  }

  validateAdName(){
    console.log(this.adName);
    if(this.adName !== undefined && this.adName !== ""){
      this.showAdNameWarning = false;
    }
  }

  getAdsByFormat(format) {

    if(format.idAdFormatType !== undefined){ // If idadformattype == 1 means that this ad can be responsive, in that case show options for the user so that the user can decide width and height
      if(format.idAdFormatType === 1){
        this.showResponsiveDiv = true;
      }else{
        this.showResponsiveDiv = false;
      }
    }else{
      this.showResponsiveDiv = false;
    }

    const shadow: any = document.getElementById("card-popup-shadow");
    shadow.classList.add("is-visible");
    shadow.style.visibility = "visible";

    let formatSize = format.width.toString() +"x"+ format.height.toString();


    if(format.name.toLowerCase() === "transformer"){
      formatSize = "100%x100%";
      this.width = "100%";
      this.height = "100%";
    }

    if(this.showmetadata){
      this.hidePreviewPopup();
    }
    this.showmetadata = true;
    this.format = format;

    this.json.getJSON(this.store.adServerUrl + "/getBannerList?publisherId="+89+"&tag=SCOUT24-Custom%20Template&tag=" + format.name+"&tag="+formatSize) // &width=" + width + "&height=" + height
      .subscribe(response => {

        this.loadScript = JSON.parse(response[0]["launchReturnJson"])["loadScript"];
        this.bannerId = response[0]["bannerId"];

        const obj = {
          "bannerId": this.bannerId,
          /*"service": "cacheTime<=>0<;>url<=>http:\/\/test.pliing.com\/ApiScout24-web\/FeedServlet?marketId=" + this.store.marketId + "&lazyLoad=yes"*/
          "service": "cacheTime<=>0<;>url<=>https:\/\/tte9.pliing.com\/ApiScout24-web\/FeedServlet?marketId=" + this.store.marketId + "&lazyLoad=yes" // lazyLoad=yes
        };

        console.log(obj);

        this.showPreviewPopup = true;
        // Updates ad to the service given in obj
        this.json.postJSON(this.store.adServerUrl + "/updateServiceServlet", obj)
          .subscribe(
            response => {
              const iframe: any = document.getElementById("adIframe");
              iframe.style.visibility = "visible";
              iframe.setAttribute("srcdoc",this.loadScript);
            });
      });
  }

  hidePreviewPopup(){
    this.adName = "";
    this.adClickTracker = "";
    this.adImpTracker = "";
    this.width = undefined;
    this.height = undefined;

    const shadow: any = document.getElementById("card-popup-shadow");
    shadow.classList.remove("is-visible");
    shadow.style.visibility = "hidden";

    this.showPreviewPopup = false;
    const radio: any = document.getElementById(this.format.idAdFormat);
    if(radio !== null) {
      radio.checked = false;
    }
  }


  createAd(format) {

    if(this.showResponsiveDiv){ // If it is a responsive ad format check that width and height also is defined
      if(this.adName !== undefined && this.adName !== "" && this.width !== undefined && this.width !== "" && this.height !== undefined && this.height !== "") {
        this.duplicateAd(this.bannerId);
      }else{
        if(this.adName === undefined || this.adName === ""){
          this.showAdNameWarning = true;
        }

        if(this.height === undefined || this.height === ""){
          this.showAdHeightWarning = true;
          const inp: any = document.getElementById("adHeightInput");
          inp.style.border = "1px solid red";
        }

        if(this.width === undefined || this.width === ""){
          this.showAdWidthWarning = true;
          const inp: any = document.getElementById("adWidthInput");
          inp.style.border = "1px solid red";
        }
      }
    }else{ // If the format is not responsive only the adname must be defined
      if(this.adName !== undefined && this.adName !== "") {
        this.duplicateAd(this.bannerId);
      }else{
        if(this.adName === undefined || this.adName === ""){
          this.showAdNameWarning = true;
        }

      }
    }
  }

  duplicateAd(bannerId) {

    if(this.width !== undefined){ // If no width has been defined use the format width, if it is a transformer the width will be 100%
      this.format.width = this.width;
    }

    if(this.height !== undefined){ // If no height has been defined use the format height, if it is a transformer the height will be 100%
      this.format.height = this.height;
    }


    const obj = {
      "bannerId": bannerId,
      "name": this.adName,
      "format": this.format.name,
      "width": this.format.width,
      "height": this.format.height,
      "publisher": 89, /*this.store.publisherId*/
      "service": "cacheTime<=>60<;>url<=>https:\/\/tte9.pliing.com\/ApiScout24-web\/FeedServlet?marketId=" + this.store.marketId + "&lazyLoad=yes", // lazyLoad=yes
      "tags": ["Scout24-custom", this.format.name, this.store.marketId]
    };

    if(this.adClickTracker !== undefined){
      obj["adClickTracker"] = this.adClickTracker;
      obj["prefix"] = "your_click_prefix";
    }
    if(this.adImpTracker !== undefined){
      obj["adImpTracker"] = "\""+this.adImpTracker+"\"";
    }


    this.json.postJSON(this.store.adServerUrl + "/createBannerLEServlet", obj)
      .subscribe(
        response => {
          const body = JSON.parse(response["_body"]);
          this.bannerId = body["bannerId"];
          this.showmetadata = false;
          this.store.createAdDiv = false;
          this.getAds(true);
        });
  }

  showScript(script){
    const shadow: any = document.getElementById("card-popup-shadow");
    shadow.classList.add("is-visible");
    shadow.style.visibility = "visible";

    this.showScriptDiv = true;
    this.showLoadScript = script;
  }

  closeScript(){
    const shadow: any = document.getElementById("card-popup-shadow");
    shadow.classList.remove("is-visible");
    shadow.style.visibility = "hidden";

    this.showScriptDiv = false;
    this.showLoadScript = "";
    this.copyMsg = "";
  }

  copyScript() {
    this.copySuccess = false;
    this.copyFail = false;
    const textarea: any = document.getElementById("scriptTextArea");
    const msg: any = document.getElementById("copyMsg");
    textarea.select();

    try {
      const success = document.execCommand("copy");
      if (success) {
        this.copyMsg = "Script copied";
        msg.style.color = "#8BC34A";
        this.copySuccess = true;
      } else {
        this.copyMsg = "Copy failed";
        msg.style.color = "#F44336";
        this.copyFail = true;
      }
    } catch (err) {
      this.copyMsg = "Unsupported browser!";
      msg.style.color = "#F44336";
      this.copyFail = true;

    }

  }


  setResponseWidth(){
    this.showAdWidthWarning = false;
    const inp: any = document.getElementById("adWidthInput");
    inp.style.border = "";

    this.showPxWidth = false;
    const input: any = document.getElementById("adWidthInput");
    const radio: any = document.getElementById("adWidthRadio");
    input.disabled = true;
    radio.checked = false;

    this.width = "100%";

  }
  setResponseHeight(){
    this.showAdHeightWarning = false;
    const inp: any = document.getElementById("adHeightInput");
    inp.style.border = "";
    this.showPxHeight = false;
    const input: any = document.getElementById("adHeightInput");
    const radio: any = document.getElementById("adHeightRadio");
    input.disabled = true;
    radio.checked = false;

    this.height = "100%";
  }

  enableWidthInput(){
    this.showPxWidth = true;
    this.width = this.auxWidth;
    const input: any = document.getElementById("adWidthInput");
    const radio: any = document.getElementById("responsiveWidthRadio");
    input.disabled = false;
    radio.checked = false;

  }

  enableHeightInput(){
    this.showPxHeight = true;
    this.height = this.auxHeight;
    const input: any = document.getElementById("adHeightInput");
    const radio: any = document.getElementById("responsiveHeightRadio");
    input.disabled = false;
    radio.checked = false;
  }

  setWidth(){
    this.showAdWidthWarning = false;
    const inp: any = document.getElementById("adWidthInput");
    inp.style.border = "";
    this.auxWidth = this.width;
  }


  setHeight(){
    this.showAdHeightWarning = false;
    const inp: any = document.getElementById("adHeightInput");
    inp.style.border = "";
    this.auxHeight = this.height;
  }


}
