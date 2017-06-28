import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {

  marketId;
  marketName;
  marketDescription;
  markets;
  market;
  serverName = 'https://tte9.pliing.com/ApiScout24-web';  // https://tte9.pliing.com/ApiScout24-web https://tte9.pliing.com/ApiSocut24-web http://rd001:32826/ApiSocut24-web/FeedServlet?marketId=1  http://rd001:32826/ApiSocut24-web
  imageServerUrl = 'https://admin.pliing.com/AdAssetsService-web';
  adServerUrl  = "https://admin.pliing.com/BanGen";  // ADMIN
  expandSidebar = true;
  showMarketOptions = false;
  userName;
  createAdDiv = false;
  adListDiv = false;
  noAdWarning;
  adFormatsToCreate = [{"idAdFormat":1,"templateImg":"https://mds.pliing.com/sync/libs/scm/transformer.png","name": "Transformer", "width": "250", "height": "300", "idAdFormatType": 1}];
  adList = [];
  showLoadingIcon = true;
  showComponent = false;
  showFeedEmptyError = false;
  selectedObjects;
  selectedDataContent = [];
  objectId;
  showData = false;
  constructor() { }


  addEditMarker(marketId){
    const edit: any = document.getElementById('edit-' + marketId);
    edit.classList.remove('hidden-obj');
  }

  heightlightAd(){
    const feedTab: any = document.getElementById('feedIndicator');
    const adTab: any = document.getElementById('adsIndicator');
    console.log(adTab);
    setTimeout(function () {
      if(feedTab !== null) {
        feedTab.classList.remove('active-page');
      }
      if(adTab !== null) {
        adTab.classList.add('active-page');
      }
    },500);
  }
  heightlightFeed(){
    const feedTab: any = document.getElementById('feedIndicator');
    const adTab: any = document.getElementById('adsIndicator');
    setTimeout(function () {
      if(feedTab !== null) {
        feedTab.classList.add('active-page');
      }
      if(adTab !== null) {
        adTab.classList.remove('active-page');
      }
    },500);

  }

}
