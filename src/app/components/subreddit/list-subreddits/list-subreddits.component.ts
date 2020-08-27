import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { SubredditModel } from 'src/app/model/subreddit-response';
import { SubredditService } from 'src/app/services/subreddit.service';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {

  subreddits: Array<SubredditModel>;

  constructor(
    private subredditService: SubredditService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.subredditService.getAllSubreddits().subscribe(data => {
      this.subreddits = data;
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

}