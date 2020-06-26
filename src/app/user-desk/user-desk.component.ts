import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../shared/request.service';
import { Router } from '@angular/router';
import { UserInterface } from '../shared/interfaces/user-interface';

@Component({
  selector: 'app-user-desk',
  templateUrl: './user-desk.component.html',
  styleUrls: ['./user-desk.component.css']
})
  
export class UserDeskComponent implements OnInit {

  user: UserInterface;

  arrDesk: Array<any>;

  token: string;

  public response$: Observable<any>;

  constructor(private request: RequestService, private router: Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('accesstoken');
    console.log(this.token);

    this.user = this.request.getUser();

    this.arrDesk = this.user.desk;

    console.log(this.arrDesk);

  }

  onDelete($event) {

  }
}
