import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApplicationService } from '../../../services/application.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: [
    './dashboard-overview.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class DashboardOverviewComponent implements OnInit {

  loading = true;
  products: any [] = [];
  categories: any [] = [];
  stores: any [] = [];
  admin: any;

  constructor(
    private api: ApplicationService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loading = false;


    this.api.list('api/product/all', 0, data => {
      this.products = data.dataList;
    });
    this.api.list('api/store/all', 0, data => {
      this.stores = data;
    });
    this.api.list('api/category/all', 0, data => {
      this.categories = data;
      this.loading = false;
    });
    this.admin = this.authService.getUser();
  }
}
