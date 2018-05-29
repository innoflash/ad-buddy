import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';

import {AngularFireModule} from 'angularfire2';
import {IonicStorageModule} from '@ionic/storage';
import {LoginPage} from '../pages/login/login';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {AccountPage} from '../pages/account/account';
import {AdsPage} from '../pages/ads/ads';
import {GroupsPage} from '../pages/groups/groups';
import {PagesPage} from '../pages/pages/pages';
import {SettingsPage} from '../pages/settings/settings';
import {SyncedPagesPage} from "../pages/synced-pages/synced-pages";
import {SQLite} from '@ionic-native/sqlite';
import {SyncedGroupsPage} from "../pages/synced-groups/synced-groups";


export const firebase = {
    apiKey: 'AIzaSyBUTixxTzq9QM3IloHsnREVc6RIFiPPnKc',
    authDomain: 'adbuddy-79331.firebaseapp.com',
    databaseURL: 'https://adbuddy-79331.firebaseio.com',
    projectId: 'adbuddy-79331',
    storageBucket: 'adbuddy-79331.appspot.com',
    messagingSenderId: '962867299117'
};

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
        AccountPage,
        AdsPage,
        GroupsPage,
        PagesPage,
        SettingsPage,
        SyncedPagesPage,
        SyncedGroupsPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebase),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
        AccountPage,
        AdsPage,
        GroupsPage,
        PagesPage,
        SettingsPage,
        SyncedPagesPage,
        SyncedGroupsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AngularFireDatabase,
        AngularFireAuth,
        SQLite,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
