import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Functions } from '../../extras/functions';
import { Storage } from '@ionic/storage';
import { Stats } from '../../extras/stats';
import * as $ from 'jquery';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public adFrequency:number = 0;
  public pgNum:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
  private ref:ChangeDetectorRef) {
  }

  ionViewWillLoad() {
    this.storage.get(Stats.adCheckFrequency).then(freq => {
      this.adFrequency = freq;
    }, (error) => {
      this.adFrequency = 10;
    });

    this.storage.get(Stats.pageGroupNum).then(num => {
      this.pgNum = num;
    }, (error) => {
      this.pgNum = 10;
    });
    this.ref.detectChanges();
  }

  restoreDefaults(){
    console.log('restoring default settings');
    Functions.defaultSettings(this.storage);
    this.ionViewWillLoad();
  }

  async triggerChange($event, pref:string){
    console.log($event.target.value.length);
    if($event.target.value.length == 0){
      this.storage.set(pref, 10);
    }else{
      this.storage.set(pref, $event.target.value)
    }
  }
}
