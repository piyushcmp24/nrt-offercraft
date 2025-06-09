import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListsComponent } from './user-lists/user-lists.component';
import { NewUserComponent } from './new-user/new-user.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [UserListsComponent, NewUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    SharedModule,
    RouterModule.forChild([
      { path: '', component: UserListsComponent },
      { path: 'add-user', component: NewUserComponent }
    ])
  ]
})
export class UsersModule {}
