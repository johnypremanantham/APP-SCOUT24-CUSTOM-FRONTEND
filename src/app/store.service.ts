import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {

  marketId;
  marketName;
  marketDescription;
  markets;
  market;
  serverName = 'http://rd001:32826/ApiSocut24-web';
  imageServerUrl = 'https://admin.pliing.com/AdAssetsService-web';
  serverPin = 'TEdIDp';
  expandSidebar = true;
  showMarketOptions = false;
  userName;
  createdAdDiv;
  adListDiv;
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
    console.log(adTab);
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
