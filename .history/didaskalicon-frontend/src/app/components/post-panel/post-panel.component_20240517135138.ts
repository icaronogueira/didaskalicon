import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ApiService } from '../../api.service';

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

  //treat content keys to leave only 'paragraph', 'subheader' or 'image'
  ngOnInit(): void {
    this.post=this.data;
    console.log(this.post)
    this.apiService.getPostComments(this.post._id).subscribe(comments => {
      
    });
  }

  like() {
    console.log('Like button pressed!');
  }

  dislike() {
    console.log('Dislike button pressed!');
  }

  addComment() {
    console.log('Add comment button pressed!');
  }
  
}
