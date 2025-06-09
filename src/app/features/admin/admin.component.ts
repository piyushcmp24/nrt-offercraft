// File: src/app/admin/admin.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

    constructor(public router: Router) {
        // this.router.events.subscribe(e => console.log(e));
    }
    ngOnInit(): void {
        console.log("admin component..")
    }

}