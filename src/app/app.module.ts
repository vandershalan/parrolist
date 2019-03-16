import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';


// AF2 Settings
export const firebaseConfig = {
  apiKey: 'AIzaSyAbgLEXCtwDTIrAMeYP54ovupW7eI_rvu8',
  authDomain: 'homorg-hom-list.firebaseapp.com',
  databaseURL: 'https://homorg-hom-list.firebaseio.com',
  projectId: 'homorg-hom-list',
  storageBucket: 'homorg-hom-list.appspot.com',
  messagingSenderId: '797168590106'
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireDatabaseModule,
      AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
