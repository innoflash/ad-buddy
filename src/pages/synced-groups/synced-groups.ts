import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GroupsPage} from "../groups/groups";

/**
 * Generated class for the SyncedGroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-synced-groups',
  templateUrl: 'synced-groups.html',
})
export class SyncedGroupsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SyncedGroupsPage');
  }

  async openGroups(){
      this.navCtrl.push(GroupsPage);
  }

}
