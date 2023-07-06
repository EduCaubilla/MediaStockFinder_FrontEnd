import { Component, OnInit } from '@angular/core';
import { RequestService } from '../shared/request.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HelperService } from '../shared/helper.service';
import { environment } from 'src/environments/environment';
import { UserInterface } from '../shared/interfaces/user-interface';



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

  user: UserInterface;

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
      // console.log(params.search);
      this.search = params.search;
      this.searchWords = this.search.match(/[^,(?! )]+/g).join();

      console.log(this.searchWords);
    });

    this.response$ = this.request.searchPhotos$(this.searchWords);

    return this.response$.subscribe(
      {
        next: (data) => {
          this.arrSearchPhoto = data;

          this.shufflePhotos();

          this.splitter();

          this.loading = false;

          console.log(this.arr1);
          console.log(this.arr2);
          console.log(this.arr3);
          console.log(this.arr4);
        },
        error: (error) => console.log(error)
      }
    );
}

  refreshUser() {
    this.id = localStorage.getItem('id');

    this.user = this.request.getUser();

    if (this.user === undefined && this.id !== null) {
      this.response$ = this.request.searchUser$(this.id);

      return this.response$.subscribe(
        {
          next: (data) => {
            console.log('VUELVE EL USER ACTUALIZADO ', data);
            this.user = data.user;
            this.request.newRefreshUser(this.user);
          },
          error: (error) => console.log(error)
        }
      );
    }
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
    console.log($event.target.dataset.source);
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
    {
      next: (data) => {
      // console.log(data);

      this.arrSearchPhoto = data;

      console.log(this.arrSearchPhoto);

      this.shufflePhotos();

      this.splitter();

      this.loading = false;

      // console.log(this.arr1);
      // console.log(this.arr2);
      // console.log(this.arr3);
      // console.log(this.arr4);

      },
        error: (error) => console.log(error)
      }
    );
  }

  toPhotoPage($event) {
    this.type = $event.target.dataset.source;
    this.id = $event.target.dataset.id;

    console.log(this.type);
    console.log(this.id);


    this.router.navigate([`/photo-page/${this.type}/${this.id}`]);
  }

  triggerDownloadPhoto($event) {
    this.link = $event.target.dataset.link;
    this.type = $event.target.dataset.source;
    this.id = $event.target.dataset.id;

    console.log(this.link);
    console.log(this.type);
    console.log(this.id);

    const URL_API_DOWNLOADPHOTO = `${environment.API_URL}/photo/download/${this.id}/${this.type}/${this.link}`;
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
      {  
        next: (data) => {
        // console.log(data);

        this.arrSearchPhoto = data;

        console.log(this.arrSearchPhoto);

        this.shufflePhotos();

        this.splitter();

        this.loading = false;

        // console.log(this.arr1);
        // console.log(this.arr2);
        // console.log(this.arr3);
        // console.log(this.arr4);

        },
        error: (error) => console.log(error)
      }
    );
  }

  saveItemUser($event) {

    const id = $event.target.dataset.id;

    console.log(id);

    const type = $event.target.dataset.source;

    console.log(type);

    this.getOneImageSave$(type, id);

  }

  getOneImageSave$(type, id) {

    console.log(this.user);

    this.response$ = this.request.searchOnePhoto$(type, id);

    return this.response$.subscribe(
      {
        next: (data) => {
          this.newItem = data;
          console.log('RECIBIMOS ITEM PARA AÑADIR ' + this.newItem);
          this.updateUser$();
        }, 
        error: (error) => console.log(error)
      }
    );
  }

  updateUser$() {
    console.log('ENVIAMOS ITEM PARA USER ' + this.user);

    this.response$ = this.request.addUserItem$(this.newItem);

    return this.response$.subscribe(
      {
        next: (data) => {
          this.user = data;
          console.log('VUELVE EL USER ACTUALIZADO ', this.user);
          alert('The image has been added on your Desk.');
        },
        error:(error) => console.log(error)
      }
    );
  }

  scroll() {
    window.onscroll = () => { this.scrollFunction(); };
  }

  scrollFunction() {
    if ((document.body.scrollTop > 1500 || document.documentElement.scrollTop > 1500) && 
    !!document.getElementById('btnTop')) {
      document.getElementById('btnTop').style.display = 'block';
    } else {
      document.getElementById('btnTop').style.display = 'none';
    }
  }

  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

}
