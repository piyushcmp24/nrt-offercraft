import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientProfileComponent } from './client-profile.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [ClientProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ClientProfileComponent }
    ])
  ]
})
export class ClientProfileModule {}
