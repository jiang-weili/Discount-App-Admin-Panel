import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './containers/login/login.component';
import { dashboardRoutes } from './containers/dashboard/dashboard.routing';
import { DashboardComponent } from './containers/dashboard/dashboard.component';

const routes: Routes = [
{
  path: 'dashboard',
  component: DashboardComponent,
  children: dashboardRoutes,
  canActivate: [AuthGuard]
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
