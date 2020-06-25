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

// ------------------ PHOTO

// BUSCADOR PRINCIPAL
  searchPhotos$(search) {
    const URL_API_SEARCH = `http://localhost:9000/photo/${search}/1`;
    // const URL_API_SEARCH = `${environment.API_URL}/photo/${search}`;
    console.log(URL_API_SEARCH);
    return this.http.get<PhotoInterface>(URL_API_SEARCH);
  }

  searchPhotosNextPage$(search, page) {
    const URL_API_SEARCH_PAGE = `http://localhost:9000/photo/${search}/${page}`;
    // const URL_API_SEARCH = `${environment.API_URL}/photo/${search}`;
    return this.http.get<PhotoInterface>(URL_API_SEARCH_PAGE);
  }

// RANDOM
  listRandom$() {
    const URL_API_RANDOM = `${environment.API_URL}/photo/random/1`;
    return this.http.get<PhotoInterface>(URL_API_RANDOM
    );
  }

  // listRandomNext$() {
  //   const URL_API_RANDOM = `${environment.API_URL}/photo/random/1`;
  //   return this.http.get<PhotoInterface>(URL_API_RANDOM
  //   );
  // }

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

  /*
// DESCARGA DE FOTO ---- Directamente desde el ts

  // triggerDownload$(type, link) {
  //     const URL_API_DOWNLOADPHOTO = `${environment.API_URL}/photo/download/${type}/${link}`;

  //     // this.authKey = localStorage.getItem('jwt_token');

  //     const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'image/jpg',
  //       // 'Authorization': this.authKey,
  //       responseType: 'blob',
  //       Accept: 'image/jpg',
  //       observe: 'response'
  //     })
  //   };

  //   // return this.http.get(`${this.BASE_URL}/help/pdf`, httpOptions);
  //     return this.http.get(URL_API_DOWNLOADPHOTO, httpOptions);


  // }
*/


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

}
