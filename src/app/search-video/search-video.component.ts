import { Component, OnInit } from '@angular/core';
import { RequestService } from '../shared/request.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HelperService } from '../shared/helper.service';
import { environment } from 'src/environments/environment';
import { UserInterface } from '../shared/interfaces/user-interface';


@Component({
  selector: 'app-search-video',
  templateUrl: './search-video.component.html',
  styleUrls: ['./search-video.component.css']
})
export class SearchVideoComponent implements OnInit {

  arrSearchVideo: Array<any>;

  arr1: Array<any>;
  arr2: Array<any>;
  arr3: Array<any>;
  arr4: Array<any>;

  public searchBox: boolean;

  public loading: boolean;

  public response$: Observable<any>;

  public user: UserInterface;

  search: string;
  searchWords: string;
  newSearch: string;

  type: string;
  id: string;
  link: string;
  page: number;

  isLogged: boolean;

  newItem: any;

  constructor(private request: RequestService, private route: ActivatedRoute, private helper: HelperService, private router: Router) {
    this.loading = true;
    this.searchBox = false;
    this.newSearch = '';
  }

  ngOnInit() {

    this.isLogged = this.request.getLogged();

    console.log(this.isLogged);

    this.refreshUser();

    this.route.params.subscribe(params => {
      this.search = params.search;
      this.searchWords = this.search.match(/[^,(?! )]+/g).join();

      console.log(this.searchWords);
    });

    this.response$ = this.request.searchVideos$(this.searchWords);

    return this.response$.subscribe(
        (data) => {
        this.arrSearchVideo = data;
        // this.arrShuffle = this.arrSearchPhoto;

        this.shuffleVideos();

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


  splitter() {

    const numberArr: number = Math.ceil(this.arrSearchVideo.length / 4);

    [this.arr1, this.arr2, this.arr3, this.arr4] = this.helper.partitionArray(this.arrSearchVideo, numberArr);

  }

  shuffleVideos() {
    this.helper.shuffle(this.arrSearchVideo);
  }

  cleanView() {
    [this.arr1, this.arr2, this.arr3, this.arr4] = [[], [], [], []];
  }

  getData($event) {
    console.log($event.target.dataset.id);
    console.log($event.target.dataset.font);
  }

  activeSearch() {
    this.searchBox = true;
  }

  searchVideos$() {

    this.loading = true;

    // console.log(this.newSearch);

    this.router.navigate([`/search-video/${this.newSearch}`]);

    this.searchBox = false;

    this.searchWords = this.newSearch.match(/[^,(?! )]+/g).join();
    // console.log(this.searchWords);

    this.response$ = this.request.searchVideos$(this.searchWords);

    return this.response$.subscribe(
      (data) => {
      // console.log(data);

      this.arrSearchVideo = data;

      console.log(this.arrSearchVideo);

      this.shuffleVideos();

      this.splitter();

      this.loading = false;

      console.log(this.arr1);
      console.log(this.arr2);
      console.log(this.arr3);
      console.log(this.arr4);

      },
    (error) => console.log(error));

  }

  toVideoPage($event) {
    this.type = $event.target.dataset.font;
    this.id = $event.target.dataset.id;

    console.log(this.type);
    console.log(this.id);


    this.router.navigate([`/video-page/${this.type}/${this.id}`]);
  }

  triggerDownloadVideo($event) {
    this.link = $event.target.dataset.link;

    const link = btoa(`${this.link}`);

    console.log(this.link);

    const URL_API_DOWNLOADVIDEO = `${environment.API_URL}/video/download/${link}`;
    window.location.assign(URL_API_DOWNLOADVIDEO);
  }

  toVideoNextPage$() {

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

    this.response$ = this.request.searchVideosNextPage$(this.searchWords, this.page);

    return this.response$.subscribe(
      (data) => {
      // console.log(data);

      this.arrSearchVideo = data;

      console.log(this.arrSearchVideo);

      this.shuffleVideos();

      this.splitter();

      this.loading = false;

      console.log(this.arr1);
      console.log(this.arr2);
      console.log(this.arr3);
      console.log(this.arr4);

      },
    (error) => console.log(error));
  }

  updateUser$() {
    console.log('ENVIAMOS ITEM PARA USER ' + this.user);
    
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
        console.log('RECIBIMOS ITEM PARA AÑADIR ' + this.newItem);
        this.updateUser$();
      }, (error) => {
        console.log(error)
      }
    );
  }

}

