import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserInterface } from '../shared/interfaces/user-interface';
import { RequestService } from '../shared/request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  placeholder = {
    username: 'Insert Name',
    userpass: 'Insert password',
  };

  public user: UserInterface;

  public token$: Observable<any>;

  constructor(private request: RequestService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(event, formulario) {
    event.preventDefault();

    this.user = {
      email: formulario[0].value,
      password: formulario[1].value,
    };

    console.log('Entra info de user');


    formulario.reset();

    this.token$ = this.request.loginUser$(this.user);

    alert('Welcome to Media Stock Finder. Happy Search!');

    return this.token$.subscribe(
      (data) => {

        // console.log(data);

        const token = data.token;

        // console.log(token);

        const user = data.user;

        console.log('Sale hacia Serv' + user);

        this.request.setToken(token);

        this.request.setUser(user);

        this.reloadComponent();
      },
      (error) => console.log(error)
    );
  }

   reloadComponent() {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/home']);
  }

}
