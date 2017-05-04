import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import {JsonService} from './json-service.service';
import {StoreService} from './store.service';
import { GetcontentComponent } from './getcontent/getcontent.component';
import { CreatemarketComponent } from './createmarket/createmarket.component';
import { EditmarketComponent } from './editmarket/editmarket.component';
import {DragulaModule} from 'ng2-dragula';
import { AdsComponent } from './getcontent/ads/ads.component';
import {Ng2PaginationModule} from 'ng2-pagination';



/*
 import {ROUTES} from "./app.router";
 */

const appRoutes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard/getcontent/:id',  component: GetcontentComponent},
  {path: 'getcontent/:id', redirectTo: 'dashboard/getcontent/:id', pathMatch: 'full'},
  {path: 'dashboard/createmarket',  component: CreatemarketComponent},
  {path: 'createmarket', redirectTo: 'dashboard/createmarket', pathMatch: 'full'},
  {path: 'dashboard/ads/:id',  component: AdsComponent},
  {path: 'ads/:id', redirectTo: 'dashboard/ads/:id', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    GetcontentComponent,
    CreatemarketComponent,
    EditmarketComponent,
    AdsComponent



  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    DragulaModule,
    Ng2PaginationModule

  ],
  exports: [
    RouterModule
  ],
  providers: [JsonService, StoreService],
  bootstrap: [AppComponent]
})
export class AppModule {}

