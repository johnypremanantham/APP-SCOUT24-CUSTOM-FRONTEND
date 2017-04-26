import { Component, OnInit } from '@angular/core';
import {JsonService} from "../json-service.service";
import {StoreService} from "../store.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-createmarket',
  templateUrl: './createmarket.component.html',
  styleUrls: ['./createmarket.component.css']
})
export class CreatemarketComponent implements OnInit {
  showComponent = false;
  showLoadingIcon = true;

  marketname;
  marketdescription;

  marketnameError = false;
  marketdescriptionError = false;

  constructor(private json: JsonService, private store: StoreService, private router: Router) { }

  ngOnInit() {
    this.showLoadingIcon = false;
    this.showComponent = true;

    if(this.store.expandSidebar) {
      const sidebar: any = document.getElementById('sidebar-markets');
      sidebar.click();
    }

  }



  updateMetadata() {
    if (this.marketname !== undefined || this.marketname !== '') {
      this.marketnameError = false;
    }
    if (this.marketdescription !== undefined || this.marketdescription !== '') {
      this.marketdescriptionError = false;
    }
  }
  save() {
    let save = false;
    if (this.marketname === undefined || this.marketname === '') {
      this.marketnameError = true;
      save = false;
    }else {
      save = true;
    }
    if (this.marketdescription === undefined || this.marketdescription === '') {
      this.marketdescriptionError = true;
      save = false;
    }else {
      save = true;
    }
    if (save) {
      const obj = {
          'name': this.marketname,
          'description': this.marketdescription };
      this.json.postJSON(this.store.serverName + '/Market', obj)
        .subscribe(
          response => {
            response = JSON.parse(response['_body']);
            this.store.market = response[0];

            this.json.getJSON(this.store.serverName + '/Market')
              .subscribe(response => {
                console.log(response);
                this.store.markets = response;
                this.showComponent = false;
                this.showLoadingIcon = true;

                const _localThis = this;
                setTimeout(function () {
                  const editmarket: any = document.getElementById('edit-' + _localThis.store.marketId);
                  editmarket.classList.remove('hidden-obj');
                  _localThis.router.navigate(['/getcontent', _localThis.store.market.id]);
                },500);


              });


          });
    }
  }
}
