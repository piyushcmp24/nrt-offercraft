import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListInstantRewardsComponent } from './components/list-instant-rewards/list-instant-rewards.component';

const routes: Routes = [
  { path: '', component: ListInstantRewardsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstantRewardsRoutingModule { }
