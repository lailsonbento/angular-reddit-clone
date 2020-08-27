import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { SubredditModel } from 'src/app/model/subreddit-response';
import { SubredditService } from 'src/app/services/subreddit.service';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {

  createSubredditForm: FormGroup;
  subredditModel: SubredditModel;

  constructor(
    private router: Router,
    private subredditService: SubredditService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) {

    this.createSubredditForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.subredditModel = {
      name: '',
      description: ''
    }
  }

  ngOnInit() {
  }

  discard() {
    this.router.navigateByUrl('/');
  }

  createSubreddit() {
    this.subredditModel.name = this.createSubredditForm.get('title').value;
    this.subredditModel.description = this.createSubredditForm.get('description').value;
    this.subredditService.createSubreddit(this.subredditModel)
      .subscribe(data => {
        this.router.navigateByUrl('/list-subreddits');
      }, error => {
        this.toastr.error(error.error.message);
        throwError(error);
      })
  }
}