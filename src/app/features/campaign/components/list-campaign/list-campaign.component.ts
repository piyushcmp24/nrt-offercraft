import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-campaign',
  templateUrl: './list-campaign.component.html',
  styleUrl: './list-campaign.component.scss'
})
export class ListCampaignComponent implements OnInit {

  constructor(){}
  ngOnInit(): void {
    console.log("campaign lists page")
  }

   displayedCount = 15;
  totalCount = 43;
  searchTerm = '';

  campaigns = [
    {
      title: 'New Campaign',
      start: new Date('2025-06-09'),
      end: new Date('2025-06-23'),
      status: 'Pending',
      previewCode: 'PREVIEW-7553C948'
    },
    // Add more campaign objects here...
  ];

  tags = [
    { label: 'Wheel spin', count: 2, checked: false },
    { label: 'Acquisition campaign', count: 1, checked: false },
    { label: 'Demo campaign', count: 1, checked: false },
    { label: 'Memory_match', count: 1, checked: false },
    { label: 'Spin wheel', count: 1, checked: false },
  ];



}
