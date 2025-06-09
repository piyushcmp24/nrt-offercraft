import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './list-instant-rewards.component.html',
  styleUrl: './list-instant-rewards.component.scss'
})
export class ListInstantRewardsComponent implements OnInit {

  constructor(){}
  ngOnInit(): void {
    console.log("Lists of Instant Rewards page")
  }
}
