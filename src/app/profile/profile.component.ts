import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../services/LoginService';
import { ResponseBean } from '../models/ResponseBean';
import { LoginCredentials } from '../models/LoginCredentials';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  showJoinTodayDiv: boolean;
  editbuttonDisplay: boolean;
  responseData: any;
  profileSuccess: boolean;
  constructor(private http: HttpClient, private loginService: LoginService) { }

  ngOnInit() {
    const loginMail = localStorage.getItem('loginEmail');
    const url = 'api/profile?email=' + loginMail;

    this.loginService.getProfile().subscribe(
      (response: ResponseBean) => {
        console.log(response);
        localStorage.setItem('lastLoginDate', response.lastLoginDate);
        this.responseData = response;
      },
      error => {

      }
    );
  }
  displayDiv() {
  this.showJoinTodayDiv = true;
  this.editbuttonDisplay = true;
  this.profileSuccess = false;
 }
 updateProfile(f) {
  let updateProfileData: ResponseBean;
  updateProfileData = f.value;
  updateProfileData.email = localStorage.getItem('loginEmail');
  console.log(updateProfileData);
  this.loginService.updateProfile(updateProfileData).subscribe(
    (resp: ResponseBean) => {
      if (resp.status === 'success') {
       this.profileUpdated();
      }
    },
    error => {
      }
    );
   }
   profileUpdated() {
    this.showJoinTodayDiv = false;
    this.editbuttonDisplay = false;
    this.profileSuccess = true;
   }
   cancelUpdate() {
    this.editbuttonDisplay = false;
    this.showJoinTodayDiv = false;
    }
}
