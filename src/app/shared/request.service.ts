import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { PhotoInterface } from './photo-interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

// BUSCADOR PRINCIPAL
  searchPhotos$(search) {
    // const URL_API_SEARCH = `http://localhost:9000/photo/${search}`;
    const URL_API_SEARCH = `${environment.API_URL}/photo/${search}`;
    return this.http.get<PhotoInterface>(URL_API_SEARCH);
  }

// RANDOM
  listRandom$() {
    const URL_API_RANDOM = `${environment.API_URL}/photo/random`;
    return this.http.get<PhotoInterface>(URL_API_RANDOM
    );
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


}
