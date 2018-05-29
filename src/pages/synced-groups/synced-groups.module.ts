import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SyncedGroupsPage } from './synced-groups';

@NgModule({
  declarations: [
    SyncedGroupsPage,
  ],
  imports: [
    IonicPageModule.forChild(SyncedGroupsPage),
  ],
})
export class SyncedGroupsPageModule {}
