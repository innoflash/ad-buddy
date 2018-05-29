import {Component} from '@angular/core';
import {IonicPage, NavParams, ViewController, AlertController, LoadingController, Loading} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth'
import * as firebase from 'firebase';
import * as $ from 'jquery';
import {Stats} from '../../extras/stats';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    public logoPic: string;
    loading: Loading;

    constructor(public navParams: NavParams, private fire: AngularFireAuth,
                private view: ViewController, private alertCtrl: AlertController,
                private loader: LoadingController) {
        this.logoPic = "../../assets/imgs/logo.png"
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    login() {
        console.log('will do firebase facebook login')
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_likes');
        provider.addScope('email');
        provider.addScope('user_managed_groups');

        this.fire.auth.signInWithPopup(provider)
            .then(res => {
                console.log('got data');
                console.log(res);
                this.loading = this.loader.create({
                    content: 'Getting access token ..'
                });
                this.loading.present();
                $.ajax({
                    method: 'GET',
                    timeout: 5000,
                    url: Stats.getLongLivedAccessToken(res.credential.accessToken)
                }).done(data => {
                    console.log(data);
                    this.view.dismiss({
                        firebase: res,
                        facebook: data
                    });
                }).fail(error => {
                    this.alertCtrl.create({
                        title: Stats.server_response,
                        subTitle: JSON.stringify(error),
                        buttons: ['OK']
                    }).present();
                }).always(() => {
                    this.loading.dismiss();
                });
            }, (error) => {
                console.log(error)
                this.alertCtrl.create({
                    title: Stats.server_response,
                    subTitle: error.message,
                    buttons: ['OK']
                }).present();
            });
    }
}
