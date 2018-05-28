import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import * as $ from 'jquery';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase';
import { Stats } from '../../extras/stats';
import { Storage } from '@ionic/storage';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private loader: LoadingController,
    private fire: AngularFireAuth, private storage: Storage) {
    this.showPages = false;
    this.serverResponse = '';
    this.likedPages = [];
    this.loading = loader.create({
      content: 'Getting access token ..'
    });
  }

  ionViewDidLoad() {
    this.loading.present();
    var provider = new firebase.auth.FacebookAuthProvider();
    this.fire.auth.signInWithPopup(provider)
      .then(res => {
        // this.loading.setContent('Loading likes pages...');
        console.log(res);
        var userid = res.additionalUserInfo.profile.id;
        var access_token = res.credential.accessToken;
        var pgNum:number = 10;
        this.storage.get(Stats.pageGroupNum).then(num => {pgNum = num});
        this.loadPages(Stats.getLikedPages(userid, access_token, pgNum), true);
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

}
