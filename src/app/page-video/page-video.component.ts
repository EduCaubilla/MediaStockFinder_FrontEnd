import { Component, OnInit } from '@angular/core';
import { RequestService } from '../shared/request.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserInterface } from '../shared/interfaces/user-interface';


@Component({
  selector: 'app-page-video',
  templateUrl: './page-video.component.html',
  styleUrls: ['./page-video.component.css']
})
export class PageVideoComponent implements OnInit {

  item: {};

  public loading: boolean;

  public response$: Observable<any>;

  public user: UserInterface;

  type: string;
  id: string;
  link: string;

  isLogged: boolean;
  
  newItem: any;

  constructor(private request: RequestService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.isLogged = this.request.getLogged();

    console.log(this.isLogged);

    this.refreshUser();

    this.route.params.subscribe(params => {
        // console.log(params.search);
        this.type = params.type.toLowerCase();
        this.id = params.id;
 
        console.log(this.type);
        console.log(this.id);

      });

    this.response$ = this.request.searchOneVideo$(this.type, this.id);

    this.loading = false;

    return this.response$.subscribe(
      (data) => {
      this.item = data;

      console.log(this.item);

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
  
  triggerDownloadVideo($event) {
    this.link = $event.target.dataset.link;

    const link = btoa(`${this.link}`);

    console.log(this.link);

    const URL_API_DOWNLOADVIDEO = `${environment.API_URL}/video/download/${link}`;
    window.location.assign(URL_API_DOWNLOADVIDEO);
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

  alert() {
    alert('You need to be logged in to save photos.')
  }

}
