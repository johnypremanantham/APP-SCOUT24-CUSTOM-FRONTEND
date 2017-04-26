import { Component, OnInit } from '@angular/core';
import {StoreService} from "../store.service";
import {JsonService} from "../json-service.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-getcontent',
  templateUrl: './getcontent.component.html',
  styleUrls: ['./getcontent.component.css']
})
export class GetcontentComponent implements OnInit {

  showComponent = false;
  objectId;
  objectData;
  constructor(public store: StoreService, private json: JsonService, private activatedRoute: ActivatedRoute) { }

  // CLICK SIDEBAR
  ngOnInit() {
    console.log("getcontent init");
    if(this.store.market === undefined) {
      this.activatedRoute.params.subscribe((params: Params) => {
        console.log(params);
        this.store.marketId = params['id'];
        console.log(this.store.marketId);
        this.json.getJSON(this.store.serverName + '/Market?marketId=' + this.store.marketId)
          .subscribe(response => {
            this.store.market = response[0];
            this.store.marketName = this.store.market.name;
            this.store.marketDescription = this.store.market.description;
            this.showComponent = true;
          });
      });
    }
    this.showComponent = true;

  }


  getData(){
    console.log(this.objectId);
    this.json.getJSON(this.store.serverName + '/GetAppartment?pin='+this.store.serverPin+'&objectId=' + this.objectId)
      .subscribe(response => {
        console.log(response);
        this.objectData = JSON.stringify(response);

      });

  }

}
