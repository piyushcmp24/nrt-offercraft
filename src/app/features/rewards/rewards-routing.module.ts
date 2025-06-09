import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRewardsComponent } from './components/list-rewards/list-rewards.component';

const routes: Routes = [
  { path: '', component: ListRewardsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardsRoutingModule { }
