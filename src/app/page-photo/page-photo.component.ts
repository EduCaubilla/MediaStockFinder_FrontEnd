import { Component, OnInit } from '@angular/core';
import { RequestService } from '../shared/request.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page-photo',
  templateUrl: './page-photo.component.html',
  styleUrls: ['./page-photo.component.css']
})
export class PagePhotoComponent implements OnInit {

  item: {};

  public loading: boolean;

  public response$: Observable<any>;

  type: string;
  id: string;
  link: string;

  constructor(private request: RequestService, private route: ActivatedRoute) {
    this.loading = true;
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // console.log(params.search);
      this.type = params.type.toLowerCase();
      this.id = params.id;

      console.log(this.type);
      console.log(this.id);

    });

    this.response$ = this.request.searchOnePhoto$(this.type, this.id);

    this.loading = false;

    return this.response$.subscribe(
      (data) => {
        this.item = data;

        console.log(this.item);

      },
      (error) => console.log(error));
  }

  triggerDownloadPhoto($event) {
    this.link = $event.target.dataset.link;
    this.type = $event.target.dataset.font;

    console.log(this.link);
    console.log(this.type);

    const URL_API_DOWNLOADPHOTO = `${environment.API_URL}/photo/download/${this.type}/${this.link}`;
    window.location.assign(URL_API_DOWNLOADPHOTO);
  }

}
