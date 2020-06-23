import { Component, OnInit } from '@angular/core';
import { RequestService } from '../shared/request.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HelperService } from '../shared/helper.service';

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

  search: string;
  searchWords: string;
  newSearch: string;

  type: string;
  id: string;

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

  splitter() {

    const numberArr: number = Math.ceil(this.arrSearchVideo.length / 4);

    [this.arr1, this.arr2, this.arr3, this.arr4] = this.helper.partitionArray(this.arrSearchVideo, numberArr);

  }

  shuffleVideos() {
    this.helper.shuffle(this.arrSearchVideo);
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

}

