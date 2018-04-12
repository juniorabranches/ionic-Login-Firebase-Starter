import { LoginPage } from './login';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoadingService } from '../../../providers/util/loading.service';
import { AlertService } from '../../../providers/util/alert.service';
import { ToastService } from '../../../providers/util/toast.service';
import { AuthData } from '../../../providers/auth-data';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  exports: [
    LoginPage
  ], 
  providers: [
  	LoadingService, AlertService, ToastService, AuthData
  ]
})

export class LoginModule { }
