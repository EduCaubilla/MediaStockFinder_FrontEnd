import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from './shared/request.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'MediaStockFinder';

   public isLogged:Boolean = false;

  constructor(private router: Router, private request: RequestService) {
   }

  ngOnInit(): void {

    this.onCheckUser();

  }



  public onLogout(): void {
    this.request.logoutUser();
    this.isLogged = false;
    this.router.navigate(['/home']);
  }

  public onCheckUser(): void {
    this.request.isLogged.subscribe(value => this.isLogged = value);
  }

}
