import { Component } from '@angular/core';
import { LoginService } from './services/LoginService';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

 constructor(public loginServce: LoginService) {
    }
// tslint:disable-next-line:use-life-cycle-interface
ngOnInit(): void {
  this.loginServce.homeButtonDisabled = false;
}
}
