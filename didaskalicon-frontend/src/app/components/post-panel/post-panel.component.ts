import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ApiService } from '../../api.service';
import { Comment } from '../../models/comments.model';

@Component({
  selector: 'app-post-panel',
  templateUrl: './post-panel.component.html',
  styleUrl: './post-panel.component.css',
})
export class PostPanelComponent implements OnInit{

  post:any;
  contents:any;
  comments: any[]= [];
  
  new_comment_author: string="";
  new_comment_text: string="";
  

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private apiService: ApiService) {}

  //load post and comments
  ngOnInit(): void {
    this.post=this.data;
    console.log('post'+this.post)
    this.apiService.getPostComments(this.post._id).subscribe(comments => {
      console.log('comments '+ comments)
      this.comments=comments;
    });
    console.log('comments '+ this.comments)
  }

  like(postId: string): void {
    this.apiService.likePost(postId).subscribe({
      next: (response) => {
        this.post=response;
        console.log('Post liked sucessfully', response)
      },
      error: (error) => {
        console.error('Error liking post', error)
      }
    });
  }

  dislike(postId: string): void {
    this.apiService.dislikePost(postId).subscribe({
      next: (response) => {
        this.post=response;
        console.log('Post disliked sucessfully', response)
      },
      error: (error) => {
        console.error('Error disliking post', error)
      }
    });
  }

  addComment(postId: string) {
    let comment: Comment = {
      author: this.new_comment_author,
      text: this.new_comment_text,
      post_id: postId
    }
    this.comments.push(comment);
    console.log("em postPanelComponent. addComment() - comentário sendo enviado :  " + comment);
    this.apiService.saveComment(comment).subscribe({
      next: (response) => {
        this.new_comment_author="";
        this.new_comment_text="";
        console.log('Comment saved sucessfully', response);
      },
      error: (error) => {
        console.error('Error saving comment', error)
      }
    });
    
  }
  
}
