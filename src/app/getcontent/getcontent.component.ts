import { Component, OnInit } from '@angular/core';
import {StoreService} from "../store.service";
import {JsonService} from "../json-service.service";
import {ActivatedRoute, Params} from "@angular/router";
import {DragulaService} from "ng2-dragula";

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



  getSelectedObjects(){
    this.selectedDataContent = [];
    this.json.getJSON(this.store.serverName + '/Object?marketId=' + this.store.marketId)
      .subscribe(response => {
        console.log(response);
        if(response.length > 0) {
          this.selectedObjects = response[0]['json'];
          this.selectedObjects = JSON.parse(this.selectedObjects);
          const _localThis = this;
          // Get data for each entry
          this.selectedObjects.forEach(function (elm) {
            _localThis.json.getJSON(_localThis.store.serverName + '/GetAppartment?pin=' + _localThis.store.serverPin + '&objectId=' + elm)
              .subscribe(response => {
                _localThis.selectedDataContent.push(response);
              });
          });
        }
      });
  }

  updateSelectedList(){
    this.selectedDataContent = [];
    const _localThis = this;
    // Get data for each entry
    this.selectedObjects.forEach(function (elm) {
      _localThis.json.getJSON(_localThis.store.serverName + '/GetAppartment?pin='+_localThis.store.serverPin+'&objectId=' + elm)
        .subscribe(response => {
          _localThis.selectedDataContent.push(response);
        });
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


  saveObjects(){
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


}
