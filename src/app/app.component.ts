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

  constructor(private json: JsonService, private router: Router, private store: StoreService) {
  }


  ngOnInit() {
    console.log('a');
  }
  createMarket() {
    this.store.expandSidebar = false;
    this.router.navigate(['/createmarket']);
  }
  getMarketContent(market) {
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

    this.router.navigate(['/getcontent', this.store.market.id]);

  }

  getMarketOption(option){
    console.log(option);
    console.log(this.store.marketId);
    if(option === 'ads'){
      this.json.getJSON(this.store.serverName + '/FeedServlet?marketId=' + this.store.marketId)
        .subscribe(response => {
          if(response.length > 0){
            const feedTab: any = document.getElementById('feedIndicator');
            const adTab: any = document.getElementById('adsIndicator');
            feedTab.classList.remove('active-page');
            adTab.classList.add('active-page');
            this.router.navigate(['/ads', this.store.marketId]);
          }else{
            this.router.navigate(['/getcontent', this.store.marketId]);

          }

        });
    }else if(option === 'feed'){
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
}

