import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplatesComponent } from './templates.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [TemplatesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: TemplatesComponent }
    ])
  ]
})
export class TemplatesModule {}
