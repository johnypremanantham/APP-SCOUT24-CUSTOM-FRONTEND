import {Component, OnInit} from '@angular/core';
import {JsonService} from './json-service.service';
import {Router} from '@angular/router';
import {StoreService} from './store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  markets;
  showFeedEmptyError = false;

  constructor(private json: JsonService, private router: Router, public store: StoreService) {
  }


  ngOnInit() {
    const _localThis = this;
    setTimeout(function () {
      _localThis.store.userName = localStorage.getItem("username");

    }, 500);
  }
  createMarket() {
    this.store.expandSidebar = false;
    this.router.navigate(['/createmarket']);
  }
  getMarketContent(market) {
    this.store.showFeedEmptyError = false; // Resets the error message "you must first build your feed before creating an ad"
    this.store.showComponent = false;
    this.store.showLoadingIcon = true;
    this.store.marketId = market.id;
    this.store.marketName = market.name;
    this.store.marketDescription = market.description;
    this.store.markets.forEach(function (market) {
      const removeedit: any = document.getElementById('edit-' + market.id);
      if(removeedit !== null){
        removeedit.classList.add('hidden-obj');
      }
    });

    this.store.market = market;
    const edit: any = document.getElementById('edit-' + market.id);

    /*edit.classList.remove('hidden-obj');*/

    this.json.getJSON(this.store.serverName + '/FeedServlet?marketId=' + this.store.marketId)
      .subscribe(response => {
        this.store.selectedDataContent = response;
        this.store.selectedDataContent.forEach(function (elm, index) {
          if(elm["type"] === undefined){
            const img = elm["adpicture"]["href"];
            elm["adpicture"]["href"] = img.replace("%WIDTH%", "278").replace("%HEIGHT%","125");
            elm["pricem2"] = (elm["price"]["value"]/elm["livingspace"]);

          }
        });

        this.json.getJSON(this.store.serverName + '/Object?marketId=' + this.store.marketId)
          .subscribe(response => {
            if(response.length > 0) {
              this.store.selectedObjects = response[0]['json'];
              this.store.selectedObjects = JSON.parse(this.store.selectedObjects);
            }
            this.store.showComponent = true;
            this.store.showLoadingIcon = false;
            this.router.navigate(['/getcontent', this.store.market.id]);
          });
      });
  }

  getMarketOption(option){

    if(option === 'ads'){
      this.store.showComponent = false;
      this.store.showLoadingIcon = true;
      this.store.createAdDiv = false;
      this.store.adListDiv = false;
      this.json.getJSON(this.store.serverName + '/FeedServlet?marketId=' + this.store.marketId)
        .subscribe(response => {
          const feedTab: any = document.getElementById('feedIndicator');
          const adTab: any = document.getElementById('adsIndicator');
          feedTab.classList.remove('active-page');
          adTab.classList.add('active-page');
          if(response.length < 1) {
            this.store.showFeedEmptyError = true;
            this.router.navigate(['/ads', this.store.marketId]);

          }else{
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

                /*If no ads has been created show warning (info) message, otherwise show the created ads*/
                if(this.store.adList.length < 1){
                  this.store.noAdWarning = true;
                }else{
                  this.store.adListDiv = true;
                }
                this.store.showLoadingIcon = false;
                this.store.showComponent = true;
                this.router.navigate(['/ads', this.store.marketId]);

              });

          }



        });
    }
    if(option === 'feed'){
      this.router.navigate(['/getcontent', this.store.marketId]);
    }

  }

  editMarket() {

  }
  getMarkets() {
    this.json.getJSON(this.store.serverName + '/Market')
      .subscribe(response => {
        this.store.markets = response;
  });
}

  heightlightAd(){
    setTimeout(function () {
    const feedTab: any = document.getElementById('feedIndicator');
    const adTab: any = document.getElementById('adsIndicator');

      if(feedTab !== null) {
        feedTab.classList.remove('active-page');
      }
      if(adTab !== null) {
        adTab.classList.add('active-page');
      }
    },500);
  }

  gotoHome(){
    this.router.navigate(['/']);

  }

}

