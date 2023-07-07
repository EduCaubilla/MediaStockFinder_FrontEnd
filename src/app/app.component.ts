import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from './shared/request.service';
import { UserInterface } from './shared/interfaces/user-interface';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'MediaStockFinder';

  public isLogged: boolean;
  public user: UserInterface;

  constructor(private router: Router, private request: RequestService) {
  }

  ngOnInit(): void {

    this.onCheckUser();
    this.request.refreshUser();

  }

  public onLogout(): void {

    let responseWarning = confirm('You are about to log out. \nThanks for your visit.');
    if (!responseWarning) return;

    this.request.logoutUser();
    this.onCheckUser();
    this.router.navigate(['/']);
  }

  public onCheckUser(): void {
    this.request.isLogged.subscribe(value => this.isLogged = value);
  }

}
