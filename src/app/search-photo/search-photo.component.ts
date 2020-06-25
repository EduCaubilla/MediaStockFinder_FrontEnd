import { Component, OnInit } from '@angular/core';
import { RequestService } from '../shared/request.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HelperService } from '../shared/helper.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-search-photo',
  templateUrl: './search-photo.component.html',
  styleUrls: ['./search-photo.component.css']
})
export class SearchPhotoComponent implements OnInit {

  arrSearchPhoto: Array<any>;

  arr1: Array<any>;
  arr2: Array<any>;
  arr3: Array<any>;
  arr4: Array<any>;

  public searchBox: boolean;

  public loading: boolean;

  public response$: Observable<any>;

  search: string;
  searchWords: string;
  newSearch: string;

  type: string;
  id: string;
  link: string;
  page: number;

  constructor(private request: RequestService, private route: ActivatedRoute, private helper: HelperService, private router: Router) {
    this.loading = true;
    this.searchBox = false;
    this.newSearch = '';
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      // console.log(params.search);
      this.search = params.search;
      this.searchWords = this.search.match(/[^,(?! )]+/g).join();

      console.log(this.searchWords);
    });

    this.response$ = this.request.searchPhotos$(this.searchWords);

    return this.response$.subscribe(
        (data) => {
        this.arrSearchPhoto = data;
        // this.arrShuffle = this.arrSearchPhoto;

        this.shufflePhotos();

        this.splitter();

        this.loading = false;

        console.log(this.arr1);
        console.log(this.arr2);
        console.log(this.arr3);
        console.log(this.arr4);

        // console.log(this.arrSearchPhoto);
        },
      (error) => console.log(error));

}

  splitter() {

    const numberArr: number = Math.ceil(this.arrSearchPhoto.length / 4);

    [this.arr1, this.arr2, this.arr3, this.arr4] = this.helper.partitionArray(this.arrSearchPhoto, numberArr);

  }

  shufflePhotos() {
    this.helper.shuffle(this.arrSearchPhoto);
  }

  getData($event) {
    console.log($event.target.dataset.id);
    console.log($event.target.dataset.font);
  }

  cleanView() {
    [this.arr1, this.arr2, this.arr3, this.arr4] = [[], [], [], []];
  }

  activeSearch() {
    this.searchBox = true;
  }

  searchPhotos$() {

    this.loading = true;

    // console.log(this.newSearch);

    this.router.navigate([`/search-photo/${this.newSearch}`]);

    this.searchBox = false;

    this.searchWords = this.newSearch.match(/[^,(?! )]+/g).join();
    // console.log(this.searchWords);

    this.response$ = this.request.searchPhotos$(this.searchWords);

    return this.response$.subscribe(
      (data) => {
      // console.log(data);

      this.arrSearchPhoto = data;

      console.log(this.arrSearchPhoto);

      this.shufflePhotos();

      this.splitter();

      this.loading = false;

      console.log(this.arr1);
      console.log(this.arr2);
      console.log(this.arr3);
      console.log(this.arr4);

      },
    (error) => console.log(error));

  }

  toPhotoPage($event) {
    this.type = $event.target.dataset.font;
    this.id = $event.target.dataset.id;

    console.log(this.type);
    console.log(this.id);


    this.router.navigate([`/photo-page/${this.type}/${this.id}`]);
  }

  triggerDownloadPhoto($event) {
    this.link = $event.target.dataset.link;
    this.type = $event.target.dataset.font;

    console.log(this.link);
    console.log(this.type);

    const URL_API_DOWNLOADPHOTO = `${environment.API_URL}/photo/download/${this.type}/${this.link}`;
    window.location.assign(URL_API_DOWNLOADPHOTO);
  }

  toSearchPhotoNextPage$() {
    this.cleanView();

    window.scroll(0, 0);

    this.loading = true;

    this.route.params.subscribe(params => {
      // console.log(params.search);
      this.search = params.search;
      this.searchWords = this.search.match(/[^,(?! )]+/g).join();

      console.log(this.searchWords);
    });

    if (!this.page) {
      this.page = 2;
    } else {
      this.page += 1;
    }

    console.log(this.page);

    this.response$ = this.request.searchPhotosNextPage$(this.searchWords, this.page);

    return this.response$.subscribe(
      (data) => {
      // console.log(data);

      this.arrSearchPhoto = data;

      console.log(this.arrSearchPhoto);

      this.shufflePhotos();

      this.splitter();

      this.loading = false;

      console.log(this.arr1);
      console.log(this.arr2);
      console.log(this.arr3);
      console.log(this.arr4);

      },
    (error) => console.log(error));
  }

}
