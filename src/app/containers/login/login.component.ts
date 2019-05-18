import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  state: any = {};
  loginErrorMessage: string;
  returnUrl: string;

  constructor(private authService: AuthService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.state.loginFlow = 'normal';
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  login() {
    this.loginErrorMessage = null;

    if (!this.state.username || !this.state.password) {
      return this.loginErrorMessage = 'Please enter the username and password';
    }

    this.authService.authenticateUser(this.state.username, this.state.password)
      .subscribe(
        data => {
          this.authService.storeUserData(data);
          this.authService.getProfile()
            .subscribe(
              user => {
                sessionStorage.setItem('user', JSON.stringify(user));
              },
              err => {
                console.log('err', err);
              }
            );
          this.router.navigate([this.returnUrl]);
        },
        err => {
          this.loginErrorMessage = 'Invalid username or password';
        }
      );
  }
}
