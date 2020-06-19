import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { PhotoInterface } from './photo-interface';


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
    const URL_API_SEARCH = `http://localhost:9000/photo/${search}`;
    return this.http.get<PhotoInterface>(URL_API_SEARCH);
  }

// RANDOM
  listRandom$() {
    const URL_API_RANDOM = 'http://localhost:9000/photo/random';
    return this.http.get<PhotoInterface>(URL_API_RANDOM
    );
  }

// CATEGORÍA NATURE
  searchPhotosNature$() {
    const URL_API_NATURE = `http://localhost:9000/photo/categories/nature`;
    return this.http.get<PhotoInterface>(URL_API_NATURE);
  }

// CATEGORÍA PEOPLE
  searchPhotosPeople$() {
    const URL_API_PEOPLE = `http://localhost:9000/photo/categories/people`;
    return this.http.get<PhotoInterface>(URL_API_PEOPLE);
  }

// CATEGORÍA FOOD & DRINKS

  searchPhotosFoodDrink$() {
    const URL_API_FOODDRINK = `http://localhost:9000/photo/categories/food&drink`;
    return this.http.get<PhotoInterface>(URL_API_FOODDRINK);
  }

// CATEGORÍA LATEST

  searchPhotosLatest$() {
    const URL_API_LATEST = `http://localhost:9000/photo/categories/latest`;
    return this.http.get<PhotoInterface>(URL_API_LATEST);
  }

// RANDOM PARA UNA FOTO - JUMBOTRON

  oneRandom$() {
    const URL_API_ONERANDOM = 'http://localhost:9000/photo/onerandom';
    return this.http.get<PhotoInterface>(URL_API_ONERANDOM);
  }


}
