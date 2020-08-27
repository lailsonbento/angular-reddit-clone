import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.css']
})
export class ViewSubredditComponent {

  subrreditId: number;

  constructor(private activateRoute: ActivatedRoute) {
    this.subrreditId = this.activateRoute.snapshot.params.id;
  }

}
