import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, Validator, FormGroup, Validators } from '@angular/forms';
import { SingupModel } from '../models/SingupModel';
import { Router } from '@angular/router';
import { RegistrationValidator } from './RegistrationValidator';
import { EmailValidator } from './EmailValidator';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  responseData: String;
  registerForm: FormGroup;
  passwordFormGroup: FormGroup;
  emailFormGroup: FormGroup;
  submitted = false;
  buttonDisable = false;
  model: SingupModel = {
    firstName : '',
    lastName : '',
    email : '',
    password : '',
    cpassword : ''
  };
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {
   }
  get f() { return this.registerForm.controls; }
  get p() {return this.passwordFormGroup.controls; }
  // get e() {return this.emailFormGroup.controls; }
  ngOnInit() {
      this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      // emailFormGroup : this.emailFormGroup,
      passwordFormGroup: this.passwordFormGroup
    });
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', Validators.required]
    }, {
      validator: RegistrationValidator.validate.bind(this)
    });
    // this.emailFormGroup = this.formBuilder.group({
      // email : ['', [Validators.required, Validators.email]]
   // }, {
    //  validator : EmailValidator.validate.bind(this)
  //  });
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    if (this.passwordFormGroup.invalid) {
      return;
  }
    this.buttonDisable = true;
    this.model.firstName = this.registerForm.value.firstName;
    this.model.lastName = this.registerForm.value.lastName;
    this.model.email = this.registerForm.value.email;
    this.model.password = this.passwordFormGroup.value.password;
    this.model.cpassword = this.passwordFormGroup.value.cpassword;
    console.log('this.registerForm.value.email::::::::  ' + this.registerForm.value.email);
    console.log(this.model);
    this.http.post('/api/signUp', this.model, {responseType: 'text'}).subscribe(
      response => {
        this.responseData = response;
       // this.registerForm.reset();
      },
      error => {
       this.router.navigateByUrl('error');
      }
    );
 }
}
