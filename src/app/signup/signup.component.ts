import { Component, OnInit } from '@angular/core';
import { RequestService } from '../shared/request.service.js';
import { Observable } from 'rxjs';
import { UserInterface } from '../shared/interfaces/user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  data$: Observable<any>;

  public userData: UserInterface = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    desk: []
  };
  constructor(private request: RequestService, private router: Router) {}

  ngOnInit(): void {}

  onRegister() {
    this.request.registerUser$(this.userData).subscribe((res) => {
      const id = res._id;

      console.log(res);
      
      this.router.navigate(['/login']);

    }),
      (err) => {
        return console.log('Error on register' + err);
      };
  }

}
