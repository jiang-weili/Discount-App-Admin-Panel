import { Routes } from '@angular/router';
import { AllUserComponent } from '../../containers/dashboard/all-users/all-users.component';
import { ProductsComponent } from './products/products.component';
import { MemberPrivilegeComponent } from './member-privilege/member-privilege.component';
import { CategoriesComponent } from './categories/categories.component';
import { UserTypeResolverService } from 'src/services/user-type-resolver.service';
import { AuthService as AuthGuard } from '../../../services/auth.service';
import { StoreComponent } from './stores/store.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

export const dashboardRoutes: Routes = [
  {
    path: '', component: MainDashboardComponent,
    data: { title: 'Dashboard' },
    resolve: {
      userType: UserTypeResolverService,
    }
  },
  {
    path: 'products', component: ProductsComponent,
    data: { title: 'Products' },
    resolve: {
      userType: UserTypeResolverService,
    }
  },
  {
    path: 'stores', component: StoreComponent,
    data: { title: 'Stores' },
    resolve: {
      userType: UserTypeResolverService,
    }
  },
  {
    path: 'members-privileges', component: MemberPrivilegeComponent,
    data: { title: 'Members'},
    resolve: {
      userType: UserTypeResolverService,
    }
  },
  {
    path: 'categories', component: CategoriesComponent,
    data: { title: 'Categories'},
    resolve: {
      userType: UserTypeResolverService,
    }
  }
];
