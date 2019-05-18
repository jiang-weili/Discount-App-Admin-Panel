import { Component, OnInit, Input } from '@angular/core';
// import { ApplicationService } from '../../services/application.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: [
    './main-header.component.scss'
  ]
})
export class MainHeaderComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() { }

  logout() {
    this.authService.logout();
  }
}
