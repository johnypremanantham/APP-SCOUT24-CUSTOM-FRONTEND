import { Component, OnInit } from '@angular/core';
import {StoreService} from "../store.service";
import {JsonService} from "../json-service.service";
import {ActivatedRoute, Params} from "@angular/router";
import {DragulaService} from "ng2-dragula";
import set = Reflect.set;

@Component({
  selector: 'app-getcontent',
  templateUrl: './getcontent.component.html',
  styleUrls: ['./getcontent.component.css']
})
export class GetcontentComponent implements OnInit {

  showComponent = false;
  objectId;
  objectData;
  showData = false;
  selectedObjects;
  selectedDataContent = [];
  showLogoDiv = false;
  allowed_types = ["jpeg", "tiff", "png", "jpg", "bmp", "gif", "svg", "image/png", "image/jpeg", "image/tiff", "image/jpg", "image/bmp", "image/gif", "image/svg+xml"];

  logoPicture;
  logoPicB64;
  logoPicType;
  logoURL;
  constructor(public store: StoreService, private json: JsonService, private activatedRoute: ActivatedRoute, private dragulaService: DragulaService) {
    dragulaService.setOptions('bag-one', {
      revertOnSpill: true
    });

  }



  // CLICK SIDEBAR
  ngOnInit() {
    this.store.showMarketOptions = true;
    let getObjects = true;
    if(this.store.market === undefined) {
      const sidebar: any = document.getElementById('sidebar-markets');
      sidebar.click();

      getObjects = false;
      this.activatedRoute.params.subscribe((params: Params) => {
        this.store.marketId = params['id'];
        const _localThis = this;
        setTimeout(function () {
          _localThis.store.addEditMarker(_localThis.store.marketId);
        },1000);

        this.json.getJSON(this.store.serverName + '/Market?marketId=' + this.store.marketId)
          .subscribe(response => {
            this.store.market = response[0];
            this.store.marketName = this.store.market.name;
            this.store.marketDescription = this.store.market.description;
            this.showComponent = true;

            // Get selected objects
            this.getSelectedObjects();


          });
      });
    }
    this.showComponent = true;
    if(getObjects) {
    this.getSelectedObjects();
    }
  }

 /* test(id){
    console.log(id);
    const div: any = document.getElementById('object-' + id);
    div.classList.add('gu-transit ex-over');

  }*/


  getSelectedObjects(){
    this.selectedDataContent = [];
    /*this.json.getJSON(this.store.serverName + '/FeedServlet?marketId=' + this.store.marketId)
      .subscribe(response => {
        console.log(response);
        this.selectedDataContent = response;*/
    /*});*/

        this.json.getJSON(this.store.serverName + '/Object?marketId=' + this.store.marketId)
          .subscribe(response => {
            console.log(response);
            if(response.length > 0) {
              this.selectedObjects = response[0]['json'];
              this.selectedObjects = JSON.parse(this.selectedObjects);

              console.log(this.selectedObjects);
              const _localThis = this;
              // Get data for each entry
              this.selectedObjects.forEach(function (elm, index) {
               if(parseInt(elm)) {
                 _localThis.json.getJSON(_localThis.store.serverName + '/GetAppartment?pin=' + _localThis.store.serverPin + '&objectId=' + elm)
                   .subscribe(response => {
                     response["index"] = index;
                     _localThis.selectedDataContent.push(response);
                   });
               }else{
                 elm["index"] = index;
                   _localThis.selectedDataContent.push(elm);

               }

               });

              setTimeout(function () {
               _localThis.selectedDataContent.sort(function (a,b) {
                  return a.index - b.index;
                });
              },1000);
               }

          });
  }

  updateSelectedList(){
    this.selectedDataContent = [];
    const _localThis = this;
    // Get data for each entry
    this.selectedObjects.forEach(function (elm, index) {
      if(parseInt(elm)) {
        _localThis.json.getJSON(_localThis.store.serverName + '/GetAppartment?pin=' + _localThis.store.serverPin + '&objectId=' + elm)
          .subscribe(response => {
            response["index"] = index;
            _localThis.selectedDataContent.push(response);
          });
      }else{
        elm["index"] = index;
        _localThis.selectedDataContent.push(elm);

      }
      setTimeout(function () {
        _localThis.selectedDataContent.sort(function (a,b) {
          return a.index - b.index;
        });
      },1000);

    });
  }

  removeObject(index){
    console.log(index);
    console.log(this.selectedObjects);
    this.selectedObjects.splice(index,1);
    console.log(this.selectedObjects);
    this.updateSelectedList();
  }


  getData(){
    console.log(this.objectId);
    this.json.getJSON(this.store.serverName + '/GetAppartment?pin='+this.store.serverPin+'&objectId=' + this.objectId)
      .subscribe(response => {
        console.log(response);
        this.objectData = response;
        this.showData = true;

      });
  }

  selectObject(){
    console.log();
    this.selectedObjects.push(parseInt(this.objectId));
    this.updateSelectedList();
    this.objectId = '';
    this.showData = false;

  }

  selectLogo(){

    const obj = {
      "data": [{"base64": this.logoPicB64, "type": this.logoPicType, "key": "1"}]
    }
    this.json.postJSON(this.store.imageServerUrl + "/assets", obj)
      .subscribe(
        response => {
          const body = JSON.parse(response["_body"]);
          this.logoPicture = body[0]["1"];
          const obj = {
            "type": "logo",
            "picture": this.logoPicture,
            "url": this.logoURL
          };

          this.selectedObjects.push(obj);
          this.logoURL = "";
          const img: any = document.getElementById("imgImage");
          img.src = "";
          this.showLogoDiv = false;

          console.log(this.selectedObjects);

          this.updateSelectedList();


        }
      );
  }


  saveObjects(){
    console.log(this.selectedObjects);
    const obj =
      {
        'marketId': this.store.marketId,
        'json': this.selectedObjects
      };
    this.json.postJSON(this.store.serverName + '/Object', obj)
      .subscribe(
        response => {
          // Update list of selected objects
          this.getSelectedObjects();
        });
  }



  addLogo(){
    this.showLogoDiv = true;
  }

// ---------------------START IMAGE UPLOAD ------------------------
  readImage(file) {

    const input: any = document.getElementById("imgInput");
    const image: any = document.getElementById("imgImage");

    if(file === undefined) { // file === undefined if user uploads image (not by drag & drop)
      file = input.files[0];
    }


    if (this.allowed_types.indexOf(file.type) === -1) {
      input.value = "";
      image.src = "";

      return;
    } else {
      // Retrieve base64 of image
      this.readFiles(file, file.type, image, input);
    }
  }


  readFiles(file, fileType, image, input) {

    // Create the file reader
    const reader = new FileReader();
    const _localThis = this;
    this.readFile(file, reader, (base64) => {
      image.onload = function () {

        base64 = base64.replace("data:" + fileType + ";base64,", "");
        fileType = fileType.replace("image/", "");
        const obj = {};
        obj['base64'] = base64;
        obj['type'] = fileType;

        _localThis.logoPicB64 = base64;
        _localThis.logoPicType = fileType;


      }
      // Display image use the url that the servlet responds with
      image.src = window.URL.createObjectURL(file);
    });

  }

  readFile(file, reader, callback) {
    reader.onload = () => {
      callback(reader.result); // file.type
    };
    reader.readAsDataURL(file);
  }

  dropImage(event){
    event.preventDefault();
    const data = event.dataTransfer.files;
    const file = data["0"];

    this.readImage(file);
  }

  triggerFileUpload(image){
    document.getElementById("imgInput").click();
  }


  allowDrop(event){
    event.preventDefault();
  }


  preventDragDrop(){
    window.addEventListener("dragover",function(e:Event){
      e = e || event;
      e.preventDefault();
    },false);
    window.addEventListener("drop",function(e:Event){
      e = e || event;
      e.preventDefault();
    },false);
  }

  // -----------------------END IMAGE UPLOAD--------------------------

}
