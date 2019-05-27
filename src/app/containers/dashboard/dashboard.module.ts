import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NumberOnlyDirective } from '../../directive/number.directive';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AllUserComponent } from './all-users/all-users.component';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routing';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { ProductsComponent } from './products/products.component';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { MemberPrivilegeComponent } from './member-privilege/member-privilege.component';
import { CategoriesComponent } from './categories/categories.component';
import { DeleteAlertModalComponent } from './modals/delete-alert-modal/delete-alert-modal.component';
import { BackWithoutSaveAlertModalComponent } from './modals/back-without-save-alert-modal/back-without-save-alert-modal.component';
import { StoreComponent } from './stores/store.component';
import { StoresCenterComponent } from './stores-center/stores-center.component';
import { AssignProductsComponent } from './modals/assign-products/assign-products.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { DashboardWorkspaceComponent } from './dashboard-workspace/dashboard-workspace.component';
import { PositiveNumberOnlyDirective } from '../../directive/positiveNumber.directive';
import { AddEditStoreComponent } from '../../containers/dashboard/add-edit-store/add-edit-store.component';
import { AddNewComponent } from '../../components/add-new/add-new.component';
import { MemberComponent } from '../../components/member/member.component';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AllProductsComponent } from './all-products/all-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { LookBookStoreComponent } from './modals/look-book-store/look-book-store.component';
import { AddEditItemComponent } from './modals/add-edit-item/add-edit-item.component';
import { AllStoresComponent } from './all-stores/all-stores.component';
import { ChartComponent } from '../../components/chart/chart.component';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AgmCoreModule } from '@agm/core';

import { MDBBootstrapModule, ChartsModule } from 'angular-bootstrap-md';

// Import angular-fusioncharts
import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme, TimeSeries);

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
};

@NgModule({
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  imports: [
    PerfectScrollbarModule,
    CommonModule,
    CarouselModule,
    FormsModule,
    NgSelectModule,
    Ng5SliderModule,
    NgxDatatableModule,
    DragAndDropModule,
    NgbTabsetModule,
    ReactiveFormsModule,
    RouterModule.forChild(dashboardRoutes),
    GooglePlaceModule,
    AgmCoreModule.forRoot({
        apiKey:'AIzaSyAUkBNadf_lQyCLnNbrgqB9PCLdFP-Agj8',
        libraries: ["places"]
    }),
    MDBBootstrapModule.forRoot(),
    ChartsModule,
    FusionChartsModule
  ],
  entryComponents: [
    EditUserComponent,
    DeleteAlertModalComponent,
    AssignProductsComponent,
    BackWithoutSaveAlertModalComponent,
    AddEditStoreComponent,
    EditProductComponent,
    LookBookStoreComponent,
    AddEditItemComponent,
  ],
  declarations: [
    MemberComponent,
    NumberOnlyDirective,
    PositiveNumberOnlyDirective,
    EditUserComponent,
    DashboardComponent,
    AllUserComponent,
    ProductsComponent,
    AddNewComponent,
    MemberPrivilegeComponent,
    CategoriesComponent,
    DeleteAlertModalComponent,
    BackWithoutSaveAlertModalComponent,
    StoreComponent,
    StoresCenterComponent,
    AssignProductsComponent,
    MainDashboardComponent,
    DashboardOverviewComponent,
    DashboardWorkspaceComponent,
    AddEditStoreComponent,
    AllProductsComponent,
    EditProductComponent,
    LookBookStoreComponent,
    AddEditItemComponent,
    AllStoresComponent,
    ChartComponent
  ]
})
export class DashboardModule { }
