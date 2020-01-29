import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
export class RegistrationValidator {

  constructor(private http : HttpClient){
    
  }

  static validate(registrationFormGroup: FormGroup) {
    let password = registrationFormGroup.controls.password.value;
    let repeatPassword = registrationFormGroup.controls.cpassword.value;
    if (repeatPassword.length <= 0) {
      return null;
    }
    if (repeatPassword !== password) {
      return {
        doesMatchPassword: true
      };
    }
    return null;
  }
}