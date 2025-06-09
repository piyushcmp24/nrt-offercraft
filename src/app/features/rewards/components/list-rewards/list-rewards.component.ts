import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-rewards',
  templateUrl: './list-rewards.component.html',
  styleUrl: './list-rewards.component.scss'
})
export class ListRewardsComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {
    console.log("Rewards home page")
  }

}
