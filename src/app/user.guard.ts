import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { RequestService } from './shared/request.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router, private request: RequestService) { }
  
  canActivate(
    route: ActivatedRouteSnapshot) {

    if (localStorage.getItem('isLogged') === 'true') {
      return true;
    } else {
      alert('You need to be logged in to access this page.')
      this.router.navigate(['login']);
      return false;
    }
  }

}

