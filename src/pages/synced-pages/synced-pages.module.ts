import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SyncedPagesPage } from './synced-pages';

@NgModule({
  declarations: [
    SyncedPagesPage,
  ],
  imports: [
    IonicPageModule.forChild(SyncedPagesPage),
  ],
})
export class SyncedPagesPageModule {}
