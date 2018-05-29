import {Component} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import * as $ from 'jquery';
import {AngularFireAuth} from 'angularfire2/auth'
import {Storage} from '@ionic/storage';
import {Stats} from "../../extras/stats";
import * as firebase from "firebase";
import {User} from "../../extras/user";
import {Functions} from "../../extras/functions";

/**
 * Generated class for the PagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-pages',
    templateUrl: 'pages.html',
})
export class PagesPage {
    loading: Loading;
    showPages: boolean;
    serverResponse: string;
    likedPages: any;
    nextPage: string;
    gotoNext: boolean = true;
    access_token: string;
    currentUser: User;

    constructor(public navCtrl: NavController, public navParams: NavParams, private loader: LoadingController,
                private fire: AngularFireAuth, private storage: Storage,
                private alertCtrl: AlertController) {
        this.showPages = false;
        this.serverResponse = '';
        this.likedPages = [];
        this.loading = loader.create({
            content: 'Getting liked pages ..'
        });
    }

    ionViewDidLoad() {
        this.storage.get(Stats.access_token).then(res => this.access_token = res).catch(error => console.log(error));
        this.storage.get(Stats.user).then(user => {
            this.currentUser = Functions.getUser(JSON.parse(user));
            console.log(this.currentUser);
            var pgNum: number = 10;
            this.storage.get(Stats.pageGroupNum).then(num => {
                pgNum = num;
            });
            this.loading.present();
            console.log(this.currentUser);
            this.loadPages(Stats.getLikedPages(this.currentUser.id, this.access_token, pgNum), true);
        });

    }

    async getNewToken() {
        var provider = new firebase.auth.FacebookAuthProvider();
        this.fire.auth.signInWithPopup(provider)
            .then(res => {
                // this.loading.setContent('Loading likes pages...');
                console.log(res);
                var userid = res.additionalUserInfo.profile.id;
                var access_token = res.credential.accessToken;

                $.ajax({
                    method: 'GET',
                    timeout: 5000,
                    url: Stats.getLongLivedAccessToken(this.access_token)
                }).done(data => {
                    console.log(data);
                    this.storage.set(Stats.access_token, data.facebook.access_token);
                });
                this.loadPages(Stats.getLikedPages(userid, access_token, 10), true);
            }, (error) => {
                console.log(error);
                this.showPages = false;
                this.serverResponse = error.message;
                this.loading.dismiss();
            });
    }

    doInfinite(infiniteScroll) {
        this.loadPages(this.nextPage, false);
        infiniteScroll.complete();
    }

    loadPages(url: string, dismiss: boolean) {
        if (this.gotoNext) {
            if (dismiss) {
                this.loading.setContent('Loading likes pages...');
                this.loading.present();
            }
            $.ajax({
                method: 'GET',
                url: url,
                timeout: 5000
            }).done((data) => {
                if (data.error) {
                    this.getNewToken();
                }else{
                    this.showPages = true;
                    console.log(data);
                    var likes: any = {};
                    if (data.likes) {
                        likes = data.likes
                    } else {
                        likes = data;
                    }
                    likes.data.forEach(like => {
                        this.likedPages.push(like);
                    });
                    if (likes.paging.next) {
                        console.log(likes.paging.next);
                        this.gotoNext = true;
                        this.nextPage = likes.paging.next;
                    } else {
                        this.gotoNext = false;
                        console.log('got no next');
                    }
                }
            }).fail((error) => {
                this.showPages = false;
                this.serverResponse = JSON.stringify(error);
            }).always(() => {
                if (dismiss) {
                    this.loading.dismiss();
                }
            });
        } else {
            console.log('aint ghot next');
        }
    }

    async optLike(like){
        console.log(like);
        let alert = this.alertCtrl.create({
            title: 'Add Page',
            message: 'Do you want to sniff ads from ' + like.name,
            buttons: [
                {
                    text: 'Nope!',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Oh, yeah!',
                    handler: () => {
                        //todo send the page to API first then save on local machine

                    }
                }
            ]
        });
        alert.present();
    }

}
