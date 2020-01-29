import { Component, OnInit, Input } from '@angular/core';
import { SingupModel } from '../models/SingupModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';
import { LoginService } from '../services/LoginService';
import { LoginCredentials } from '../models/LoginCredentials';
import { ResponseBean } from '../models/ResponseBean';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() buttonHidden: boolean;
  loginData: String;
  visible: boolean;
  model: SingupModel = {
    firstName : '',
    lastName : '',
    email : '',
    password : '',
    cpassword : ''
  };


  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.homeButtonDisabled = false;
    localStorage.setItem('isLoggedIn', 'false');
  }

  login(f) {
    let loginCredentials: LoginCredentials;
    loginCredentials = f.value;
    console.log(loginCredentials);
    this.visible = true;
    const url = 'api/login';
    this.loginService.login(loginCredentials).subscribe(
      (resp: ResponseBean) => {
        this.visible = false;
    if (resp.status === 'Success') {
        localStorage.setItem('isLoggedIn', 'true');
        this.visible = false;
        this.loginService.homeButtonDisabled = true;
        localStorage.setItem('loginEmail', this.model.email);
        localStorage.setItem('logindate' , resp.lastLoginDate);
        this.router.navigateByUrl('mainHome');
      } else {
        this.visible = false;
        this.loginData = 'Your Email / Password is incorrect. Please enter the correct credentials...!';
      }
     },
     error => {
      this.visible = false;
      this.router.navigateByUrl('error');
    }
    );

  }
}
