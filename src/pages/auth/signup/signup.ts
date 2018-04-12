import { AuthData } from '../../../providers/auth-data';
import { AlertService } from '../../../providers/util/alert.service';
import { LoadingService } from '../../../providers/util/loading.service';
import { ToastService } from '../../../providers/util/toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
      formBuilder: FormBuilder, public toastCtrl: ToastService,
      public loadingCtrl: LoadingService, public alertCtrl: AlertService,
      public authData: AuthData) {
    this.signupForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
      Validators.required])],
      passwordConfirm: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
      Validators.required])],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }




  signup() {
    let { email, password, passwordConfirm, firstName, lastName  } = this.signupForm.controls;
    let passwordMismatch = passwordConfirm.value !== password.value;
    if (!this.signupForm.valid || passwordMismatch) {
      let errorMessage = "";

      if(passwordMismatch) {
        errorMessage = "A senha e a confirmação de senha precisam ser iguais";
      }

      if (!firstName.valid) {
        errorMessage = "Informe seu Nome";
      } else if (!lastName.valid) {
        errorMessage = "Informe seu Sobrenome";
      } else if (!email.valid) {
        errorMessage = "Ops! Email inválido";
      } else if (!password.valid) {
        errorMessage = "A senha precisa ter de 6 a 20 caracteres";
      }

      this.toastCtrl.create(errorMessage);
    } else {
      this.loadingCtrl.present();
      let { email, password, firstName, lastName } = this.signupForm.value;
        this.authData.signupUser(email, password, firstName, lastName).then(() => {
          this.loadingCtrl.dismiss().then(() => {
            this.navCtrl.setRoot('HomePage');
          });
        }, (error) => {
          this.loadingCtrl.dismiss().then(() => {
            this.alertCtrl.createWithError(error.message);
          });
        });

    }
  }

}
