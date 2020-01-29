import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../services/LoginService';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css']
})
export class MainHomeComponent implements OnInit {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  isActiveTab = true;
  lastLoginDate: any;
  name: string;
  location = 'https://google.com';
  public imagesUrl;
  constructor(public route: ActivatedRoute, private http: HttpClient, private loginService: LoginService,
    private router: Router, private idle: Idle, private keepalive: Keepalive) {
      // sets an idle timeout of 5 seconds, for testing purposes.
   idle.setIdle(60);
   // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
   idle.setTimeout(5);
   // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
   idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

   idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
   idle.onTimeout.subscribe(() => {
     this.idleState = 'Timed out!';
     this.timedOut = true;
     this.timeout();
   });
   idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
   idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

   // sets the ping interval to 15 seconds
   keepalive.interval(15);

   keepalive.onPing.subscribe(() => this.lastPing = new Date());

   this.reset();
  }

  ngOnInit() {
    this.lastLoginDate = localStorage.getItem('logindate');
    this.loginService.homeButtonDisabled = true;
    this.loginService.getProfile().subscribe(
      response => {
        console.log(response);
        this.name = response.firstName + ' ' + response.lastName;
      }
    );
    this.imagesUrl = [
      // tslint:disable-next-line:max-line-length
      'http://www.telegraph.co.uk/cars/images/2017/01/24/A5-Sportback-main-xlarge_trans_NvBQzQNjv4BqZR6q1BRVjLLZ5nciTmZ6ABYYy2HF4Csw_oYIEcbI_AA.jpg',
      'https://www.cars.co.za/carimages_gen/Audi-TT/Audi-TT-coupe-1.8TFSI_AudiTT3c6l.jpg',
      // tslint:disable-next-line:max-line-length
      'http://www.telegraph.co.uk/content/dam/motoring2/2015/12/07/01-Kia-Sportage-front-xlarge_trans_NvBQzQNjv4BqrWYeUU_H0zBKyvljOo6zlkYMapKPjdhyLnv9ax6_too.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXPopqXeuO7fqot51N7vaZuh9EqBYgZkLexcmQ_A0Fy0CjjW6J',
      ];
  }

  activeTab() {
   return this.isActiveTab = !this.isActiveTab;
  }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
  timeout() {
    alert('Your Session has been expired please login to continue');
    this.router.navigateByUrl('/home/login');
  }
}
