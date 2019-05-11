import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService as AuthGuard, AuthService } from '../services/auth.service';

import { LoginComponent } from './containers/login/login.component';
import { dashboardRoutes } from './containers/dashboard/dashboard.routing';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { UserTypeResolverService } from '../services/user-type-resolver.service';

const routes: Routes = [
{
  path: 'dashboard',
  component: DashboardComponent,
  children: dashboardRoutes,
  canActivate: [AuthGuard],
  resolve: {
    userType: UserTypeResolverService,
  }
},
{
  path: 'login',
  component: LoginComponent,
  data: { title: 'Login' }
},
{
  path: '**',
  redirectTo: '/login',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
