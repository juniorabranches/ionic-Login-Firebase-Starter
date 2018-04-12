import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthData } from '../../../providers/auth-data';
import { LoadingService } from '../../../providers/util/loading.service';
import { AlertService } from '../../../providers/util/alert.service';
import { ToastService } from '../../../providers/util/toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginForm: any;

  constructor(public alert: AlertController, public navCtrl: NavController, public navParams: NavParams, formBuilder: FormBuilder,
    public toastCtrl: ToastService, public alertCtrl: AlertService, public loadingCtrl: LoadingService,
    public authData: AuthData, public splashscreen: SplashScreen) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
      Validators.required])],
    });
    splashscreen.hide();
  }

  login() {
    let { email, password } = this.loginForm.controls;
    if (!this.loginForm.valid) {
      let errorMessage = "";

      if (!email.valid) {
        errorMessage = "Ops! Email inválido";
      } else if (!password.valid) {
        errorMessage = "A senha precisa ter de 6 a 20 caracteres";
      }

      this.toastCtrl.create(errorMessage);
    } else {
      this.loadingCtrl.present();
      let { email, password } = this.loginForm.value;
      this.authData.loginUser(email, password).then(() => {
        this.loadingCtrl.dismiss().then(() => {
          this.goToHome();
        });
      }, (error) => {
        this.loadingCtrl.dismiss().then(() => {
          this.alertCtrl.createWithError("Acesso não encontrado, por favor verifique seu login e e-mail e senha");
        });
      });
    }
  }
  
  facebookLogin() {
    this.loadingCtrl.present();
    this.authData.facebookLogin().then(response => {
      if (response == true) {
        this.loadingCtrl.dismiss().then(() => {
          this.goToHome();
        });
      } else {
        this.loadingCtrl.dismiss().then(() => {
          if (response.message) {
            this.alertCtrl.createWithError(response.message);
          }
        });
      }
    }, error => {
      this.loadingCtrl.dismiss().then(() => {
        this.alertCtrl.createWithError(JSON.stringify(error));
      });
    });
  }

  goToHome() {
    this.navCtrl.setRoot('HomePage');
  }

  goToSignup() {

   this.navCtrl.push('SignupPage');
  }

}
