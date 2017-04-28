import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {

  marketId;
  marketName;
  marketDescription;
  markets;
  market;
  serverName = 'http://rd001:32826/ApiSocut24-web';
  serverPin = '27dwse';
  expandSidebar = true;
  showMarketOptions = false;
  userName;
  constructor() { }



  addEditMarker(marketId){
    const edit: any = document.getElementById('edit-' + marketId);
    edit.classList.remove('hidden-obj');
  }

}
