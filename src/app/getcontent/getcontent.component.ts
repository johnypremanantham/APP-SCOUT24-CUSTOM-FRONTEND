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
  showData = false;
  selectedObjects;
  selectedDataContent = [];
  constructor(public store: StoreService, private json: JsonService, private activatedRoute: ActivatedRoute) { }

  // CLICK SIDEBAR
  ngOnInit() {
    let getObjects = true;
    if(this.store.market === undefined) {
      getObjects = false;
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
    this.json.getJSON(this.store.serverName + '/FeedServlet?marketId=' + this.store.marketId)
      .subscribe(response => {
        this.selectedObjects = response[0]['json'];
        this.selectedObjects = JSON.parse(this.selectedObjects);
        const _localThis = this;
        // Get data for each entry
        this.selectedObjects.forEach(function (elm) {
          _localThis.json.getJSON(_localThis.store.serverName + '/GetAppartment?pin='+_localThis.store.serverPin+'&objectId=' + elm)
            .subscribe(response => {
              _localThis.selectedDataContent.push(response);
            });
        });
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
    this.json.postJSON(this.store.serverName + '/FeedServlet', obj)
      .subscribe(
        response => {
          // Update list of selected objects
          this.getSelectedObjects();
        });
  }


}
