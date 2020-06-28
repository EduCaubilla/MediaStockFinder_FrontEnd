import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../shared/request.service';
import { Router } from '@angular/router';
import { UserInterface } from '../shared/interfaces/user-interface';
import { HelperService } from '../shared/helper.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-user-desk',
  templateUrl: './user-desk.component.html',
  styleUrls: ['./user-desk.component.css']
})
  
export class UserDeskComponent implements OnInit {

  public user: UserInterface;

  arrDesk: Array<any>;

  arrList: Array<any>;

  token: string;

  id: string;

  isLogged: boolean;

  public response$: Observable<any>;

  constructor(private request: RequestService, private router: Router) { }

  ngOnInit() {

    this.isLogged = this.request.getLogged();

    console.log(this.isLogged);

    this.refreshUser();

  }

  refreshUser() {
    this.id = localStorage.getItem('id');

    this.user = this.request.getUser();

    console.log(this.user);

    if (this.user === undefined && this.id !== null) {
      this.response$ = this.request.searchUser$(this.id);

      return this.response$.subscribe(
      (data) => {
        console.log('VUELVE EL USER ACTUALIZADO ', data);
        this.user = data.user;
        this.arrDesk = this.user.desk;
        console.log(this.arrDesk);
        this.request.newRefreshUser(this.user);
        this.typeOfMedia();
      },
      (error) => console.log(error)
    );
    } else {
      this.arrDesk = this.user.desk;
      this.typeOfMedia();
    }
  }

  onDelete($event) {
    console.log($event.target.dataset.id);

    const id = $event.target.dataset.id;

    const newData = this.user.desk.filter((item) => item._id !== id);

    this.user.desk = newData;

    this.response$ = this.request.updateUser$(this.user);

    return this.response$.subscribe(
      (data) => {
        console.log('VUELVE EL USER ACTUALIZADO ', data);
        this.user = data;
        this.arrDesk = this.user.desk;
        this.typeOfMedia();
      },
      (error) => console.log(error)
    );
  }

  typeOfMedia() {
    this.arrList = this.arrDesk;
    const list = this.arrList;
    for (const item of list) {
      const type = item.imageMedium.substring(8, 14);
      console.log(type);
      if (type === 'player') {
        item.media = 'video';
      } else {
        item.media = 'image';
      }
    }
    console.log(this.arrList);
    console.log(this.arrDesk);
  }

  triggerDownload($event) {
    const media = $event.target.dataset.media;
    const type = $event.target.dataset.font;
    const link = $event.target.dataset.link;

    (media === 'video') ? this.triggerDownloadVideo(link) : this.triggerDownloadPhoto(link, type);

  }

  triggerDownloadPhoto(link, type) {

    const URL_API_DOWNLOADPHOTO = `${environment.API_URL}/photo/download/${type}/${link}`;
    window.location.assign(URL_API_DOWNLOADPHOTO);

  }

  triggerDownloadVideo(link) {

    const reqLink = btoa(`${link}`);

    console.log(link);

    const URL_API_DOWNLOADVIDEO = `${environment.API_URL}/video/download/${reqLink}`;
    window.location.assign(URL_API_DOWNLOADVIDEO);
  }

  toMediaPage($event) {
    const type = $event.target.dataset.font;
    const id = $event.target.dataset.id;
    const media = $event.target.dataset.media;

    console.log(type);
    console.log(id);
    console.log(media);

    (media === 'video') ? this.router.navigate([`/video-page/${type}/${id}`]) : this.router.navigate([`/photo-page/${type}/${id}`]);

  }

}
