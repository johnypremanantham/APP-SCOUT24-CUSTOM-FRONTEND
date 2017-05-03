import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StoreService} from "../../store.service";

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit, AfterViewInit {

  constructor(private store: StoreService) { }

  ngAfterViewInit(){
    this.store.heightlightAd();
    console.log(document.getElementById('adsInidicator'));

  }

  ngOnInit() {
    this.store.showMarketOptions = true;

  }

}
