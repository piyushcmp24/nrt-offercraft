import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './core/guard/auth.guard';
import { adminGuard } from './core/guard/admin.guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { HomeComponent } from './features/home/components/home.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'forgot-password', 
    component: ForgotPasswordComponent 
  },
  { 
    path: 'reset-password', 
    component: ResetPasswordComponent 
  },
  {
    path: 'home', 
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'campaign',
    loadChildren: () =>
      import('./features/campaign/campaign.module').then(m => m.CampaignModule),
    canActivate: [authGuard]
  },
  {
    path: 'rewards',
    loadChildren: () =>
      import('./features/rewards/rewards.module').then(m => m.RewardsModule),
    canActivate: [authGuard]
  },
  {
    path: 'instant-rewards',
    loadChildren: () =>
      import('./features/instant-rewards/instant-rewards.module').then(m => m.InstantRewardsModule),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [adminGuard],
    // data: { requiredRole: 'admin' }
  },
  {
    path: '**',
    redirectTo: 'admin'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
