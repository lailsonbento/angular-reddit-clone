import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentPayload } from 'src/app/model/comment.payload';
import { PostModel } from 'src/app/model/post-model';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  name: string;
  posts: PostModel[];
  comments: CommentPayload[];
  postLength: number;
  commentLength: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService) {

    this.name = this.activatedRoute.snapshot.params.name;

    this.postService.getAllPostsByUser(this.name).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    });

    this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });
  }

}
