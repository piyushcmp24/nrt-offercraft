import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrl: './integrations.component.scss'
})
export class IntegrationsComponent implements OnInit {

    ngOnInit(): void {
      console.log("Integration only")
    }

}
