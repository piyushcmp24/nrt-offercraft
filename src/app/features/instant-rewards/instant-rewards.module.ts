import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstantRewardsRoutingModule } from './instant-rewards-routing.module';
import { ListInstantRewardsComponent } from './components/list-instant-rewards/list-instant-rewards.component';


@NgModule({
  declarations: [
    ListInstantRewardsComponent
  ],
  imports: [
    CommonModule,
    InstantRewardsRoutingModule
  ]
})
export class InstantRewardsModule { }
