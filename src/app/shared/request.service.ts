import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { PhotoInterface } from './interfaces/photo-interface';
import { environment } from 'src/environments/environment';
import { UserInterface } from '../shared/interfaces/user-interface';

import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class RequestService {

  public isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getLogged());

  public user: UserInterface;

  public response$: Observable<any>;

  constructor(private http: HttpClient) {
  }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  refreshUser() {
    const id = localStorage.getItem('id');

    if (this.user === undefined && id !== null) {
      this.response$ = this.searchUser$(id);
      return this.response$.subscribe((data) => {
        this.user = data.user;
        console.log('ENTRA SERVICE USER ', this.user);
      });
    }
  }

  newRefreshUser(user) {
  this.user = user;
}

  setToken(token): void {
    console.log('guarda TOKEN');
    localStorage.setItem('accesstoken', token);
  }

  getLogged(): boolean {
    if (localStorage.getItem('isLogged') === 'true') {
      return true;
    } else { return false; }
  }

// ------------------ PHOTO


// BUSCADOR PRINCIPAL
  searchPhotos$(search) {
    const URL_API_SEARCH = `${environment.API_URL}/photo/${search}/1`;
    // const URL_API_SEARCH = `${environment.API_URL}/photo/${search}`;
    console.log(URL_API_SEARCH);
    return this.http.get<PhotoInterface>(URL_API_SEARCH);
  }

  searchPhotosNextPage$(search, page) {
    const URL_API_SEARCH_PAGE = `${environment.API_URL}/photo/${search}/${page}`;
    // const URL_API_SEARCH = `${environment.API_URL}/photo/${search}`;
    return this.http.get<PhotoInterface>(URL_API_SEARCH_PAGE);
  }

// RANDOM
  listRandom$() {
    const URL_API_RANDOM = `${environment.API_URL}/photo/random/1`;
    return this.http.get<PhotoInterface>(URL_API_RANDOM);
  }

// CATEGORÍA NATURE
  searchPhotosNature$() {
    const URL_API_NATURE = `${environment.API_URL}/photo/categories/nature`;
    return this.http.get<PhotoInterface>(URL_API_NATURE);
  }

// CATEGORÍA PEOPLE
  searchPhotosPeople$() {
    const URL_API_PEOPLE = `${environment.API_URL}/photo/categories/people`;
    return this.http.get<PhotoInterface>(URL_API_PEOPLE);
  }

// CATEGORÍA FOOD & DRINKS

  searchPhotosFoodDrink$() {
    const URL_API_FOODDRINK = `${environment.API_URL}/photo/categories/food&drink`;
    return this.http.get<PhotoInterface>(URL_API_FOODDRINK);
  }

// CATEGORÍA LATEST

  searchPhotosLatest$() {
    const URL_API_LATEST = `${environment.API_URL}/photo/categories/latest`;
    return this.http.get<PhotoInterface>(URL_API_LATEST);
  }


// RANDOM PARA UNA FOTO - JUMBOTRON

  oneRandom$() {
    const URL_API_ONERANDOM = `${environment.API_URL}/photo/onerandom`;
    return this.http.get<PhotoInterface>(URL_API_ONERANDOM);
  }

// BÚSQUEDA DE UNA FOTO

  searchOnePhoto$(type, id) {
    const URL_API_ONEPHOTO = `${environment.API_URL}/photo/page/${type}/${id}`;
    return this.http.get<PhotoInterface>(URL_API_ONEPHOTO);
  }


// ------------------ VIDEO


// VIDEO RANDOM

    getVideos$() {
    const URL_API_VIDEOS = `${environment.API_URL}/video/random/1`;
    return this.http.get<PhotoInterface>(URL_API_VIDEOS);
  }


  getNextVideos$(page) {
    console.log(page);

    const URL_API_VIDEOS = `${environment.API_URL}/video/random/${page}`;
    return this.http.get<PhotoInterface>(URL_API_VIDEOS);
  }

// BÚSQUEDA DE LISTA DE VÍDEOS

  searchVideos$(search) {
    const URL_API_VIDEOS = `${environment.API_URL}/video/${search}/1`;
    return this.http.get<PhotoInterface>(URL_API_VIDEOS);
  }

  searchVideosNextPage$(search, page) {
    const URL_API_VIDEOS = `${environment.API_URL}/video/${search}/${page}`;
    return this.http.get<PhotoInterface>(URL_API_VIDEOS);
  }

// BÚSQUEDA DE UN VÍDEO

  searchOneVideo$(type, id) {
    const URL_API_ONEVIDEO = `${environment.API_URL}/video/page/${type}/${id}`;
    return this.http.get<PhotoInterface>(URL_API_ONEVIDEO);
  }


  // ------------------------ USER

  registerUser$(user: UserInterface): Observable<any> {
    const URL_API_REGISTER = `${environment.API_URL}/user/register`;
    return this.http.post<UserInterface>(URL_API_REGISTER, JSON.stringify(user), {
      headers: this.headers,
    });
  }

  loginUser$(user: UserInterface): Observable<any> {

    const URL_API_LOGIN = `${environment.API_URL}/user/login`;

    return this.http
      .post<UserInterface>(
        URL_API_LOGIN,
        JSON.stringify(user),
        { headers: this.headers }
      )

      .pipe(tap(data => {
        localStorage.setItem('isLogged', 'true');
        this.isLogged.next(true);
        return data;
      }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        }));
  }

  logoutUser() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isLogged');
    localStorage.removeItem('id');
    localStorage.clear();
  }

  getUserLogin$(user: UserInterface) {
    const URL_API_GET_USER = `${environment.API_URL}/user/${this.user._id}`;

    return this.http.post<UserInterface>(URL_API_GET_USER, JSON.stringify(user), {
      headers: this.headers,
    });
  }

  searchUser$(id) {
    // this.user = user;
    console.log('SALE ID PARA BUSCAR USER ' + id);

    const token = localStorage.getItem('accesstoken');
    // console.log('CON EL TOKEN ' + token);

    const myToken = 'bearer ' + token;

    // console.log(myToken);

    console.log(id);

    const URL_API_UPDATE = `${environment.API_URL}/user/${id}`;

    return this.http
      .get(
        URL_API_UPDATE, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: myToken
        }
      });

  }

  getUser() {
    console.log('GET USER', this.user);

    return this.user;
  }

  setUser(user) {

    console.log('guarda USER', user);
    localStorage.setItem('id', user._id);
    this.user = user;

    console.log(this.user);
  }

  updateUser$(user: UserInterface): Observable<any> {
    // this.user = user;
    console.log('SALE USER PARA UPDATE ', user);

    const token = localStorage.getItem('accesstoken');
    // console.log('CON EL TOKEN ' + token);

    const myToken = 'bearer ' + token;

    // console.log(myToken);

    console.log(this.user._id);

    const URL_API_UPDATE = `${environment.API_URL}/user/${this.user._id}`;

    return this.http
      .post<UserInterface>(
        URL_API_UPDATE,
        JSON.stringify(user), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: myToken
          }
      })

      .pipe(tap(data => {
        console.log('ENTRA USER ACTUALIZADO ' + data);
        this.user = data;
        return data;
      }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        }));
  }

  addUserItem$(media: any): Observable<any> {
    console.log('SALE ITEM PARA ADD ', media);

    const token = localStorage.getItem('accesstoken');
    // console.log('CON EL TOKEN ' + token);

    const myToken = 'bearer ' + token;

    // console.log(myToken);

    console.log(this.user._id);

    const URL_API_UPDATE = `${environment.API_URL}/user/desk/${this.user._id}`;

    return this.http
      .post<UserInterface>(
        URL_API_UPDATE,
        JSON.stringify(media), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: myToken
          }
      })

      .pipe(tap(data => {
        console.log('ENTRA USER CON ITEM AÑADIDO ', data);
        this.user = data;
        return data;
      }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        }));
  }

}
