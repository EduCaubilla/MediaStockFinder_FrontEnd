import { Component, OnInit } from '@angular/core';
import { RequestService } from '../shared/request.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-page-video',
  templateUrl: './page-video.component.html',
  styleUrls: ['./page-video.component.css']
})
export class PageVideoComponent implements OnInit {

  item: {};

  public loading: boolean;

  public response$: Observable<any>;

  type: string;
  id: string;
  link: string;

  constructor(private request: RequestService, private route: ActivatedRoute) { }

  ngOnInit() {
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
  
  triggerDownloadVideo($event) {
    this.link = $event.target.dataset.link;

    const link = btoa(`${this.link}`);

    console.log(this.link);

    const URL_API_DOWNLOADVIDEO = `${environment.API_URL}/video/download/${link}`;
    window.location.assign(URL_API_DOWNLOADVIDEO);
  }

}
