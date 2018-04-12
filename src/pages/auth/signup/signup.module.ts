import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { AuthData } from '../../../providers/auth-data';
import { AlertService } from '../../../providers/util/alert.service';
import { LoadingService } from '../../../providers/util/loading.service';
import { ToastService } from '../../../providers/util/toast.service';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  exports: [
    SignupPage
  ],
  providers: [
    ToastService, AlertService, LoadingService, AuthData
  ]
})
export class SignupModule {}
