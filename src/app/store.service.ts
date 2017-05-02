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
  serverPin = '2j2vAD';
  expandSidebar = true;
  showMarketOptions = false;
  userName;
  constructor() { }



  addEditMarker(marketId){
    const edit: any = document.getElementById('edit-' + marketId);
    edit.classList.remove('hidden-obj');
  }

}
