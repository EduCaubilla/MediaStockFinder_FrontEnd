import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RequestService } from '../shared/request.service';
import { HelperService } from '../shared/helper.service';

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

  type: string;
  id: string;

  constructor(private request: RequestService, private router: Router, private helper: HelperService) {
    this.search = '';
    this.loading = true;
    this.showVideo = false;
  }

  ngOnInit() {
    this.getRandom$();

    this.response$ = this.request.oneRandom$();

    return this.response$.subscribe(
      (data) => {
        this.onePhoto = data[0].imageMedium;
        // console.log(data);
        // console.log(this.onePhoto);

      });
  }

  bgJumboStyle() {
    const styles = { 'background-image': `url(${this.onePhoto})` };
    console.log(this.onePhoto);
    return styles;
  }

  selectTrigger($event) {
    this.selectType = $event.target.value;
    console.log(this.selectType);
  }

  searchStart() {
    console.log(this.search);

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
    // this.showVideo = false;
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

        // console.log(this.arr1);
        // console.log(this.arr2);
        // console.log(this.arr3);
        // console.log(this.arr4);

        // console.log(this.arrPhotosRandom);
      },
      (error) => console.log(error)
    );
  }

  getCatNature$() {
    // console.log('llega el click');
    
    // this.showVideo = false;
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

        // console.log(this.arr1);
        // console.log(this.arr2);
        // console.log(this.arr3);
        // console.log(this.arr4);

        // console.log(this.arrPhotosNature);
      },
      (error) => console.log(error)
    );
  }

  getCatPeople$() {
    // console.log('llega el click');
    // this.showVideo = false;
    
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

        // console.log(this.arr1);
        // console.log(this.arr2);
        // console.log(this.arr3);
        // console.log(this.arr4);

        // console.log(this.arrPhotosNature);
      },
      (error) => console.log(error)
    );
  }

  getCatFoodDrink$() {
    // console.log('llega el click');

    // this.showVideo = false;
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

        // console.log(this.arr1);
        // console.log(this.arr2);
        // console.log(this.arr3);
        // console.log(this.arr4);

        // console.log(this.arrPhotosNature);
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

        // console.log(this.arr1);
        // console.log(this.arr2);
        // console.log(this.arr3);
        // console.log(this.arr4);

        // console.log(this.arrPhotosNature);
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

}
