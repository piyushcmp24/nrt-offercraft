import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardsRoutingModule } from './rewards-routing.module';
import { ListRewardsComponent } from './components/list-rewards/list-rewards.component';


@NgModule({
  declarations: [
    ListRewardsComponent
  ],
  imports: [
    CommonModule,
    RewardsRoutingModule
  ]
})
export class RewardsModule { }
