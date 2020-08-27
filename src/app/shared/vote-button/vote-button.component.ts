import { Component, Input } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { PostModel } from 'src/app/model/post-model';
import { VotePayload } from 'src/app/model/vote-payload';
import { VoteType } from 'src/app/model/vote-type';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent {

  @Input() post: PostModel;

  votePayload: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string;
  downvoteColor: string;
  isLoggedIn: boolean;

  constructor(
    private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService,
    private toastr: ToastrService) {

    this.votePayload = {
      voteType: undefined,
      postId: undefined
    }

    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  }

  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id)
      .subscribe(post => {
        this.post = post;
      });
  }
}
