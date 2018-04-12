import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';

export const firebaseConfig = {
  apiKey: "API_KEY_FIREBASE",
  authDomain: "AUTH_DOMAIN_FIREBASE",
  databaseURL: "DATABASE_URL_FIREBASE",
  projectId: "PROJECT_ID_FIREBASE",
  storageBucket: "",
  messagingSenderId: "MESSAGINS_SENDER_ID_FIREBASE"
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook
  ]
})
export class AppModule {}
