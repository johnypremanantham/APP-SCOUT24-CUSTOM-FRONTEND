import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {

  marketId;
  marketName;
  marketDescription;
  markets;
  market;
  serverName = 'http://rd001:32826/ApiSocut24-web';
  serverPin = '6QdfkC';
  expandSidebar = true;
  constructor() { }

}
