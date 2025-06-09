import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrl: './user-lists.component.scss'
})
export class UserListsComponent implements OnInit {
  ngOnInit(): void {
  }
  searchTerm = '';

  users = [
    { firstName: 'Super', lastName: 'Admin', login: 'kumar.arun1@compunnel.com', role: 'Superadmin' },
    { firstName: 'Iftakhar', lastName: 'Alam', login: 'iftakhar.alam@compunnel.com', role: 'Administrator' },
    { firstName: 'Mansi', lastName: 'Jain', login: 'mansi.jain@compunnel.com', role: 'Administrator' },
    { firstName: 'Himanshu', lastName: 'Kumar', login: 'himanshu.kumar@compunnel.com', role: 'System Administrator' },
    { firstName: 'Sandeep', lastName: 'Kumar', login: 'sandeep.kumar@compunnel.com', role: 'System Administrator' },
    { firstName: 'Piyush', lastName: 'Kumar', login: 'piyush.kumar@compunnel.com', role: 'System Administrator' }
  ];

  newUser: any = {
    firstName: '', lastName: '', login: '', role: '',
    email: '', twoFactor: 'None', pin: '', password: '', confirmPassword: '',
    allowSearch: false, allowPrint: false, allowReprint: false, helpMode: false
  };

  permissionOptions = [
    { label: 'Allow User Search in Redemption Portal', model: 'allowSearch' },
    { label: 'Allow User Print on Redemption Portal', model: 'allowPrint' },
    { label: 'Allow User Reprint on Redemption Portal', model: 'allowReprint' },
    { label: 'Allow Help Mode: show tips over UI elements', model: 'helpMode' }
  ];

  get filteredUsers() {
    const term = this.searchTerm.toLowerCase();
    return this.users.filter(u =>
      Object.values(u).some(val => val.toString().toLowerCase().includes(term))
    );
  }

  createUser() {
    this.users.push({ ...this.newUser });
    this.newUser = {
      firstName: '', lastName: '', login: '', role: '',
      email: '', twoFactor: 'None', pin: '', password: '', confirmPassword: '',
      allowSearch: false, allowPrint: false, allowReprint: false, helpMode: false
    };
    console.log("new user: ", this.users);

  }
}

