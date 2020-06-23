import { Component, OnInit } from '@angular/core';
import { RequestService } from '../shared/request.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


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

}
