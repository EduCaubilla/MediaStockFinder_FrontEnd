import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../shared/request.service';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  onePhoto: Array<any>;

  public response$: Observable<any>;


  constructor(private request: RequestService) { }

  ngOnInit() {
    this.response$ = this.request.oneRandom$();

    return this.response$.subscribe(
      (data) => {
        this.onePhoto = data[0].imageMedium;
      });
  }

   bgJumboStyle() {
    const styles = { 'vertical-align': 'text-top', 'background-repeat': 'no-repeat', 'background-image': `url(${this.onePhoto})` };
    console.log(this.onePhoto);
    return styles;
  }

}
