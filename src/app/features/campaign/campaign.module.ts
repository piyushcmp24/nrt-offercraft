import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCampaignComponent } from './components/list-campaign/list-campaign.component';
import { NewCampaignComponent } from './components/new-campaign/new-campaign.component';
import { CampaignRoutingModule } from './campaign-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListCampaignComponent, NewCampaignComponent],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CampaignModule { }
