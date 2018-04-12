import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFire } from 'angularfire2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(public platform: Platform,
              public splashScreen: SplashScreen, public af: AngularFire) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      this.getInitialPageToLoad().then((page) => {
        this.rootPage = page;
      });
    });
  }

  getInitialPageToLoad() {
    return new Promise((resolve, reject) => {
      const unsubscribe = this.af.auth.subscribe(user => {
        if (user) {
          resolve('HomePage');
          unsubscribe.unsubscribe();
        } else {
          resolve('LoginPage');
          unsubscribe.unsubscribe();
        }
      });
    });
  }
}