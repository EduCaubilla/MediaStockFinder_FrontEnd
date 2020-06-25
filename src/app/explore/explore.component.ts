import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../shared/request.service';
import { HelperService } from '../shared/helper.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  arrPhotosRandom: Array<any>;
  arrPhotosNature: Array<any>;
  arrPhotosPeople: Array<any>;
  arrPhotosFoodDrink: Array<any>;
  arrPhotosLatest: Array<any>;
  arrVideos: Array<any>;

  arr1: Array<any>;
  arr2: Array<any>;
  arr3: Array<any>;
  arr4: Array<any>;


  public loading: boolean;

  public showVideo: boolean;

  public response$: Observable<any>;

  type: string;
  id: string;

  link: string;

  page: number;

  constructor(private request: RequestService, private router: Router, private helper: HelperService) {
    this.loading = true;
   }

  ngOnInit() {
    this.getCatLatest$();
  }

  cleanView() {
    [this.arr1, this.arr2, this.arr3, this.arr4] = [[], [], [], []];
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

  getCatLatest$() {
    this.response$ = this.request.searchPhotosLatest$();

    return this.response$.subscribe(
      (data) => {

        this.arrPhotosLatest = data;

        this.helper.shuffle(this.arrPhotosLatest);

        const numberArr: number = Math.ceil(this.arrPhotosLatest.length / 4);

        [this.arr1, this.arr2, this.arr3, this.arr4] = this.helper.partitionArray(this.arrPhotosLatest, numberArr);

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

        // console.log(this.arrVideos);
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
    // return this.http.get(URL_API_DOWNLOADPHOTO, httpOptions);

    // this.response$ = this.request.triggerDownload$(this.type, this.link);

    // console.log(this.response$);


    // return this.response$.subscribe((data) => {
    //   const blob = new Blob([data], {type: 'image/jpg'});

    //   const url = window.URL.createObjectURL(blob);

    //   window.open(url);


      // console.log(downloadURL);


      // const link = document.createElement('a');
      // link.href = downloadURL;
      // link.download = 'MSFimage.jpg';
      // link.click();

      // this.downloadService.getPdf()
      // .subscribe((resultBlob: Blob) => {
      // var downloadURL = URL.createObjectURL(resultBlob);
      // window.open(downloadURL);});


    // });
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
    

    // this.router.navigate([`/${this.page}`]);

    // this.route.params.subscribe(params => {
    //   // console.log(params.search);
    //   this.page = params.page;
    // });

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

        // console.log(this.arr1);
        // console.log(this.arr2);
        // console.log(this.arr3);
        // console.log(this.arr4);

        // console.log(this.arrPhotosNature);
      },
      (error) => console.log(error)
    );

  }

}