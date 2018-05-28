import {Component, ChangeDetectorRef} from '@angular/core';
import {
    NavController,
    ModalController,
    Modal,
    ModalOptions,
    ActionSheetController,
    AlertController
} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Stats} from '../../extras/stats';
import {LoginPage} from '../login/login';
import {User} from '../../extras/user';
import {AngularFireAuth} from 'angularfire2/auth'
import * as firebase from 'firebase';
import {SettingsPage} from '../settings/settings';
import {Functions} from '../../extras/functions';
import {AdsPage} from '../ads/ads';
import {AccountPage} from '../account/account';
import {GroupsPage} from '../groups/groups';
import {PagesPage} from '../pages/pages';
import {SQLite} from "@ionic-native/sqlite";
import {AdBuddyDatabase} from "../../extras/db";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    currentUser: User;
    loginModal: Modal;

    constructor(public navCtrl: NavController, private storage: Storage,
                private modalCtrl: ModalController, private actionSheetCtrl: ActionSheetController,
                private alertCtrl: AlertController, private fire: AngularFireAuth,
                private detector: ChangeDetectorRef, private sqlite: SQLite) {
    }

    ionViewDidLoad() {
        this.storage.get(Stats.authed).then((val) => {

            AdBuddyDatabase.wireDatabase(this.sqlite);

            if (val == null || val == false) {
                //pop up a log in page
                Functions.defaultSettings(this.storage);
                const modalOptions: ModalOptions = {
                    enableBackdropDismiss: false
                };
                this.loginModal = this.modalCtrl.create(LoginPage, null, modalOptions);
                this.loginModal.present();
                this.loginModal.onDidDismiss(data => {
                    this.storage.set(Stats.authed, true);
                    this.storage.set(Stats.user, JSON.stringify(data.firebase));
                    this.loadProfile();
                    console.log('captured data', data.firebase);
                    this.storage.set(Stats.access_token, data.facebook.access_token);
                    if (data.firebase.additionalUserInfo.isNewUser) {
                        //send user info to the adbuddy database
                        console.log('sending info to the server...');
                    }
                });
            } else {
                this.loadProfile();
            }
        });
    }

    openMenu() {
        console.log('openning menu');
        let actionSheet = this.actionSheetCtrl.create({
            title: 'AD BUDDY',
            buttons: [
                {
                    text: 'Account',
                    icon: 'contact',
                    handler: () => {
                        console.log('will open account page');
                        this.navCtrl.push(AccountPage);
                    }
                },
                {
                    text: 'My Groups',
                    icon: 'logo-facebook',
                    handler: () => {
                        console.log('Destructive clicked');
                        this.navCtrl.push(GroupsPage);
                    }
                },
                {
                    text: 'Synced Pages',
                    icon: 'logo-facebook',
                    handler: () => {
                        console.log('Archive clicked');
                        this.navCtrl.push(PagesPage);
                    }
                }, {
                    text: 'My Ads',
                    icon: 'flag',
                    handler: () => {
                        console.log('will open my ads');
                        this.navCtrl.push(AdsPage);
                    }
                },
                {
                    text: 'Settings',
                    icon: 'cog',
                    handler: () => {
                        console.log('will open settings page');
                        this.navCtrl.push(SettingsPage);
                    }
                }, {
                    text: 'Logout',
                    role: 'destructive',
                    icon: 'log-out',
                    handler: () => {
                        this.alertCtrl.create({
                            title: Stats.appNotification,
                            message: 'Hey there, are you already done with the app now you want to log out?',
                            buttons: [
                                {
                                    text: 'Nope',
                                    handler: () => {
                                        console.log('nope am still here');
                                    }
                                },
                                {
                                    text: 'Yes, Logout',
                                    handler: () => {
                                        this.fire.auth.signOut().then(() => {
                                            this.storage.set(Stats.authed, false);
                                            //this.ionViewDidLoad();
                                            this.loginModal = this.modalCtrl.create(LoginPage);
                                            this.loginModal.present();
                                            console.log('signed out');
                                        });
                                    }
                                }
                            ]
                        }).present();
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    icon: 'close-circle-outline',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    loadProfile() {
        this.storage.get(Stats.user).then(data => {
            console.log(JSON.parse(data));
            this.currentUser = Stats.getUser(JSON.parse(data));
            console.log('loads profile', this.currentUser)
        });
    }
}
