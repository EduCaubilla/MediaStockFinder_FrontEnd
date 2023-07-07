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

  token: string;

  type: string;
  id: string;
  link: string;

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
        {
          next: (data) => {
            //console.log('DESK -> UPDATE USER ', data);
            this.user = data.user;
            this.arrDesk = this.user.desk;
            this.request.newRefreshUser(this.user);
          },
          error: (error) => console.log(error)
        });
    } else {
      this.arrDesk = this.user.desk;
    }
  }

  onDelete($event) {
    console.log($event.target.dataset.id);

    const id = $event.target.dataset.id;

    const newData = this.user.desk.filter((item) => item._id !== id);

    this.user.desk = newData;

    this.response$ = this.request.updateUser$(this.user);

    let responseWarning = confirm('Are you sure that you want to delete this item?');

    if (!responseWarning) return;

    return this.response$.subscribe(
      {
        next: (data) => {
          console.log('VUELVE EL USER ACTUALIZADO ', data);
          this.user = data;
          this.arrDesk = this.user.desk;
        },
        error: (error) => console.log(error)
      }
    );
  }

  triggerDownload($event) {
    const media = $event.target.dataset.media;
    this.type = $event.target.dataset.source;
    this.link = $event.target.dataset.link;
    this.id = $event.target.dataset.id;

    console.log("Downdload Switch ----> ");
    console.log(media, this.type, this.link, this.id);

    (media === 'video') ? this.triggerDownloadVideo(this.link) : this.triggerDownloadPhoto();
  }

  triggerDownloadPhoto() {

    console.log("Donwload Photo From Desk ----> ");
    console.log(this.id);

    const URL_API_DOWNLOADPHOTO = `${environment.API_URL}/photo/download/${this.id}/${this.type}/${this.link}`;
    window.location.assign(URL_API_DOWNLOADPHOTO);
  }

  triggerDownloadVideo(link) {

    const reqLink = btoa(`${link}`);

    console.log(link);

    const URL_API_DOWNLOADVIDEO = `${environment.API_URL}/video/download/${reqLink}`;
    window.location.assign(URL_API_DOWNLOADVIDEO);
  }

  toMediaPage($event) {
    const type = $event.target.dataset.source;
    const id = $event.target.dataset.id;
    const media = $event.target.dataset.media;

    console.log(type);
    console.log(id);
    console.log(media);

    (media === 'video') ? this.router.navigate([`/video-page/${type}/${id}`]) : this.router.navigate([`/photo-page/${type}/${id}`]);
  }
}
