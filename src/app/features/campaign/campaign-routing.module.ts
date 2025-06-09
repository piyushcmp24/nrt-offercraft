import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCampaignComponent } from './components/list-campaign/list-campaign.component';
import { NewCampaignComponent } from './components/new-campaign/new-campaign.component';

const routes: Routes = [
  { path: '', component: ListCampaignComponent },
  { path: 'add', component: NewCampaignComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
