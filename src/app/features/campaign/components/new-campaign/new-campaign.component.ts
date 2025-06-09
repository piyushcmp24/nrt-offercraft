import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrl: './new-campaign.component.scss'
})
export class NewCampaignComponent implements OnInit {

  constructor(){}
  ngOnInit(): void {
    console.log("new campaign page")
  }

}
