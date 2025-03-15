import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClient,HttpClientModule } from '@angular/common/http';

import { CallNumber } from '@ionic-native/call-number/ngx';
import {SMS} from '@ionic-native/sms/ngx'
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },CallNumber,SMS,SocialSharing,SQLite,FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
