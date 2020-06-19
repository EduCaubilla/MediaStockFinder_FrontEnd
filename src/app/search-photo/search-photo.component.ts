
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../shared/request.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from '../shared/helper.service';


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

  public response$: Observable<any>;

  search: string;
  searchWords: string;

  constructor(private request: RequestService, private route: ActivatedRoute, private helper: HelperService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      // console.log(params.search);
      this.search = params.search;
      this.searchWords = JSON. stringify(this.search.match(/[^,(?! )]+/g));

      // console.log(this.searchWords);
    });

    this.response$ = this.request.searchPhotos$(this.searchWords);

    return this.response$.subscribe(
        (data) => {
        this.arrSearchPhoto = data;
        // this.arrShuffle = this.arrSearchPhoto;

        this.shufflePhotos();

        this.splitter();

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

}
