import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApplicationService } from '../../../../services/application.service';

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
  statistics: any;

  constructor(private appService: ApplicationService) { }

  ngOnInit() {
    this.appService.getDashboardCenterData().subscribe(res => {
      this.statistics = res.statistics;
      this.loading = false;
    });
  }
}
