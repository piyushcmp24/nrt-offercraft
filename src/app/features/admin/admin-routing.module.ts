import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './../admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'client-profile',
        loadChildren: () =>
          import('./components/client-profile/client-profile.module').then(m => m.ClientProfileModule),
      },
      {
        path: 'integrations',
        loadChildren: () =>
          import('./components/integrations/integrations.module').then(m => m.IntegrationsModule),
      },
      {
        path: 'templates',
        loadChildren: () =>
          import('./components/templates/templates.module').then(m => m.TemplatesModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./components/users/users.module').then(m => m.UsersModule),
      },
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
