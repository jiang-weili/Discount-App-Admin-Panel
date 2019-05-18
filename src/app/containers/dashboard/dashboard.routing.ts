import { Routes } from '@angular/router';
import { AllUserComponent } from '../../containers/dashboard/all-users/all-users.component';
import { ProductsComponent } from './products/products.component';
import { MemberPrivilegeComponent } from './member-privilege/member-privilege.component';
import { CategoriesComponent } from './categories/categories.component';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../guards/auth.guard';
import { StoreComponent } from './stores/store.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

export const dashboardRoutes: Routes = [
  {
    path: '', component: MainDashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'products', component: ProductsComponent,
    data: { title: 'Products' }
  },
  {
    path: 'stores', component: StoreComponent,
    data: { title: 'Stores' }
  },
  // {
  //   path: 'members-privileges', component: MemberPrivilegeComponent,
  //   data: { title: 'Members'}
  // },
  {
    path: 'categories', component: CategoriesComponent,
    data: { title: 'Categories'}
  }
];
