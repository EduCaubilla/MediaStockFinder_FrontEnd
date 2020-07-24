import { Component, OnInit } from '@angular/core';
import { RequestService } from '../shared/request.service.js';
import { Observable } from 'rxjs';
import { UserInterface } from '../shared/interfaces/user-interface';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  data$: Observable<any>;

  public userData: UserInterface = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    desk: []
  };

  constructor(private request: RequestService, private router: Router) {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)]),
      password: new FormControl('', [Validators.required, this.passValid
      ]),
    });
  }

  ngOnInit(): void {}

  onRegister() {
    this.userData.name = this.signUpForm.value.name;
    this.userData.lastName = this.signUpForm.value.lastName;
    this.userData.email = this.signUpForm.value.email;
    this.userData.password = this.signUpForm.value.password;
    console.log(this.userData);
    this.request.registerUser$(this.userData).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/login']);
    }),
      (err) => {
        return console.log('Error on register' + err);
      };
  }

  passValid(control) {
    const myPass = parseInt(control.value.length);

    if (myPass >= 4) {
      return null;
    } else {
      console.log('bad password!!');
      return { passValid: 'The password must have at least four characters.' };
    }
  }

}
