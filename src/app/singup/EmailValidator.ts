import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

export class EmailValidator {
    constructor(private http: HttpClient) {
    }
   static email: string ;

    static validate(EmailFormGroup: FormGroup) {
        EmailValidator.email = EmailFormGroup.controls.email.value;
       // validateEmail();
    }
    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit(): void {
        }
}
