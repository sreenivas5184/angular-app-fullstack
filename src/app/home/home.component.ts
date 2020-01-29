import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Angular integration with Spring boot Application....!';
  response: any;
  errorData: string;
  constructor(private http: HttpClient) {
    console.log('test');
  }
  ngOnInit() {

  }
  getMsg() {
     const obsr = this.http.get('/api/hi');
     obsr.subscribe((response) => {
     console.log(response);
      this.response = response;
      console.log(this.response);
     }, error => {
       console.log(error);
       this.errorData = error;
     }
     );
  }

}
