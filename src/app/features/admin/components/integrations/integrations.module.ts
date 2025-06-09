import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IntegrationsComponent } from './integrations.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [IntegrationsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: IntegrationsComponent }
    ])
  ]
})
export class IntegrationsModule {}
