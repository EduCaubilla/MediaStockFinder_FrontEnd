import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserInterface } from '../shared/interfaces/user-interface';
import { RequestService } from '../shared/request.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  placeholder = {
    username: 'Insert email',
    userpass: 'Insert password',
  };

  loginForm: FormGroup;

  public user: UserInterface;

  public token$: Observable<any>;

  constructor(private request: RequestService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)
      ]),
      password: new FormControl('', [Validators.required, this.passValid
      ])
    });
   }

  ngOnInit(): void {
  }

  passValid(control) {
    const myPass = parseInt(control.value.length);
    console.log(control.value.length);
    

    if (myPass >= 4) {
      return null;
    } else {
      console.log('bad password!!');
      return { passValid: 'The password must have at least four characters.' };
    }
  }

  onSubmit($event) {
    $event.preventDefault();

    this.user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    console.log(this.user);

    console.log('Entra info de user');

    this.token$ = this.request.loginUser$(this.user);

    return this.token$.subscribe(
      (data) => {

        // console.log(data);

        const token = data.token;

        // console.log(token);

        const user = data.user;

        console.log('Sale hacia Serv' + user);

        this.request.setToken(token);

        this.request.setUser(user);

        alert('Welcome to Media Stock Finder. Happy Search!')
        // this.loginForm.reset();
        this.reloadComponent();
      },
      (error) => {
        console.log(error);
        alert('Your email or password are not correct. Please try again');
      }
    );
  }

  reloadComponent() {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/user-desk']);
  }

}
