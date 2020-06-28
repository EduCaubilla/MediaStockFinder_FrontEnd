import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RequestService } from '../shared/request.service';
import { HelperService } from '../shared/helper.service';
import { environment } from 'src/environments/environment';
import { UserInterface } from '../shared/interfaces/user-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  search: string;

  arrPhotosRandom: Array<any>;
  arrPhotosNature: Array<any>;
  arrPhotosPeople: Array<any>;
  arrPhotosFoodDrink: Array<any>;
  arrVideos: Array<any>;

  arr1: Array<any>;
  arr2: Array<any>;
  arr3: Array<any>;
  arr4: Array<any>;

  onePhoto: Array<any>;

  public selectType: string;

  public loading: boolean;

  public showVideo: boolean;

  public response$: Observable<any>;

  public user: UserInterface;

  isLogged: boolean;

  type: string;
  id: string;
  link: string;
  page: number;

  newItem: any;

  constructor(private request: RequestService, private router: Router, private helper: HelperService) {
    this.search = '';
    this.loading = true;
    this.showVideo = false;
  }

  ngOnInit() {

    this.isLogged = this.request.getLogged();

    console.log(this.isLogged);

    this.getOneRandom$();
    this.getRandom$();
    this.bgJumboStyle();

    this.refreshUser();

  }

  refreshUser() {
    this.id = localStorage.getItem('id');

    this.user = this.request.getUser();

    if (this.user === undefined && this.id !== null) {
      this.response$ = this.request.searchUser$(this.id);

      return this.response$.subscribe(
      (data) => {
        console.log('VUELVE EL USER ACTUALIZADO ', data);
        this.user = data.user;
        this.request.newRefreshUser(this.user);
      },
      (error) => console.log(error)
    );
    }
  }

  getOneRandom$() {
    this.response$ = this.request.oneRandom$();

    return this.response$.subscribe(
      (data) => {
        this.onePhoto = data[0].imageMedium;
      });
  }

  bgJumboStyle() {
    const styles = { 'background-image': `url(${this.onePhoto})` };
    // console.log(this.onePhoto);
    return styles;
  }

  selectTrigger($event) {
    this.selectType = $event.target.value;
    console.log(this.selectType);
  }

  searchStart() {
    switch (this.selectType) {
      case ('selectPhoto'):
        this.router.navigate([`/search-photo/${this.search}`]);
        break;
      case ('selectVideo'):
        this.router.navigate([`/search-video/${this.search}`]);
        break;
      default:
        this.router.navigate([`/search-photo/${this.search}`]);
        break;
    }
  }

  getRandom$() {
    this.loading = true;
    this.cleanView();

    this.response$ = this.request.listRandom$();

    return this.response$.subscribe(
      (data) => {
        console.log(data);
        this.arrPhotosRandom = data;
        this.helper.shuffle(this.arrPhotosRandom);

        const numberArr: number = Math.ceil(this.arrPhotosRandom.length / 4);

        [this.arr1, this.arr2, this.arr3, this.arr4] = this.helper.partitionArray(this.arrPhotosRandom, numberArr);

        this.loading = false;
      },
      (error) => console.log(error)
    );
  }

  getCatNature$() {

    this.loading = true;
    this.cleanView();

    this.response$ = this.request.searchPhotosNature$();

    return this.response$.subscribe(
      (data) => {

        this.arrPhotosNature = data;

        this.helper.shuffle(this.arrPhotosNature);

        const numberArr: number = Math.ceil(this.arrPhotosNature.length / 4);

        [this.arr1, this.arr2, this.arr3, this.arr4] = this.helper.partitionArray(this.arrPhotosNature, numberArr);

        this.loading = false;

      },
      (error) => console.log(error)
    );
  }

  getCatPeople$() {
    this.loading = true;
    this.cleanView();

    this.response$ = this.request.searchPhotosPeople$();

    return this.response$.subscribe(
      (data) => {

        this.arrPhotosPeople = data;

        this.helper.shuffle(this.arrPhotosPeople);

        const numberArr: number = Math.ceil(this.arrPhotosPeople.length / 4);

        [this.arr1, this.arr2, this.arr3, this.arr4] = this.helper.partitionArray(this.arrPhotosPeople, numberArr);

        this.loading = false;

      },
      (error) => console.log(error)
    );
  }

  getCatFoodDrink$() {
    this.loading = true;
    this.cleanView();

    this.response$ = this.request.searchPhotosFoodDrink$();

    return this.response$.subscribe(
      (data) => {

        this.arrPhotosFoodDrink = data;

        this.helper.shuffle(this.arrPhotosFoodDrink);

        const numberArr: number = Math.ceil(this.arrPhotosFoodDrink.length / 4);

        [this.arr1, this.arr2, this.arr3, this.arr4] = this.helper.partitionArray(this.arrPhotosFoodDrink, numberArr);

        this.loading = false;

      },
      (error) => console.log(error)
    );
  }

  cleanView() {
    [this.arr1, this.arr2, this.arr3, this.arr4] = [[], [], [], []];
  }

  getVideos$() {
    this.loading = true;

    this.cleanView();

    this.showVideo = true;

    this.response$ = this.request.getVideos$();

    return this.response$.subscribe(
      (data) => {
        this.arrVideos = data;

        this.helper.shuffle(this.arrVideos);

        const numberArr: number = Math.ceil(this.arrVideos.length / 4);

        [this.arr1, this.arr2, this.arr3, this.arr4] = this.helper.partitionArray(this.arrVideos, numberArr);

        this.loading = false;

        console.log(this.arrVideos);
      },
      (error) => console.log(error)
    );

  }

  toPhotoPage($event) {
    this.type = $event.target.dataset.font;
    this.id = $event.target.dataset.id;

    console.log(this.type);
    console.log(this.id);

    this.router.navigate([`/photo-page/${this.type}/${this.id}`]);
  }

  toVideoPage($event) {
    this.type = $event.target.dataset.font;
    this.id = $event.target.dataset.id;

    console.log(this.type);
    console.log(this.id);

    this.router.navigate([`/video-page/${this.type}/${this.id}`]);
  }

  triggerDownloadPhoto($event) {
    this.link = $event.target.dataset.link;
    this.type = $event.target.dataset.font;

    console.log(this.link);
    console.log(this.type);

    const URL_API_DOWNLOADPHOTO = `${environment.API_URL}/photo/download/${this.type}/${this.link}`;
    window.location.assign(URL_API_DOWNLOADPHOTO);
    
  }

  triggerDownloadVideo($event) {
    this.link = $event.target.dataset.link;

    const link = btoa(`${this.link}`);

    console.log(this.link);

    const URL_API_DOWNLOADVIDEO = `${environment.API_URL}/video/download/${link}`;
    window.location.assign(URL_API_DOWNLOADVIDEO);
  }

  toVideoNextPage$() {
    if (!this.page) {
      this.page = 2;
    } else {
      this.page += 1;
    }

    console.log(this.page);

    this.loading = true;

    this.cleanView();

    this.showVideo = true;

    this.response$ = this.request.getNextVideos$(this.page);

    return this.response$.subscribe(
      (data) => {
        this.arrVideos = data;

        console.log(this.arrVideos);

        this.helper.shuffle(this.arrVideos);

        const numberArr: number = Math.ceil(this.arrVideos.length / 4);

        [this.arr1, this.arr2, this.arr3, this.arr4] = this.helper.partitionArray(this.arrVideos, numberArr);

        this.loading = false;
      },
      (error) => console.log(error)
    );

  }

  saveItemUser($event) {

    const id = $event.target.dataset.id;

    console.log(id);

    const type = $event.target.dataset.font;

    console.log(type);

    this.getOneImageSave$(type, id);

  }

  getOneImageSave$(type, id) {

    console.log(this.user);

    this.response$ = this.request.searchOnePhoto$(type, id);

    return this.response$.subscribe(
      (data) => {
        this.newItem = data;
        console.log('RECIBIMOS ITEM PARA AÑADIR ' + this.newItem);
        this.updateUser$();
      }, (error) => {
        console.log(error)
      }
    );
  }

  updateUser$() {
    console.log('ENVIAMOS ITEM PARA USER ', this.user);
    
    this.response$ = this.request.addUserItem$(this.newItem);

    return this.response$.subscribe(
      (data) => {
        this.user = data;
        console.log('VUELVE EL USER ACTUALIZADO ', this.user);
        alert('The image has been added on your Desk.')
      },
      (error) => console.log(error)
    );
  }

  saveVideoUser$($event) {
    const id = $event.target.dataset.id;

    console.log(id);

    const type = $event.target.dataset.font;

    console.log(type);

    this.getOneVideoSave$(type, id);
  }

  getOneVideoSave$(type, id){
    console.log(this.user);

    this.response$ = this.request.searchOneVideo$(type, id);

    return this.response$.subscribe(
      (data) => {
        this.newItem = data;
        console.log('RECIBIMOS ITEM PARA AÑADIR ', this.newItem);
        this.updateUser$();
      }, (error) => {
        console.log(error)
      }
    );
  }

}