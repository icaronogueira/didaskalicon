import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-post-panel',
  templateUrl: './post-panel.component.html',
  styleUrl: './post-panel.component.css',
})
export class PostPanelComponent implements OnInit{

  post:any;
  contents:any;
  comments: any[] = [
    { author: 'John Doe', text: 'This is a great article!', date: new Date() },
    { author: 'Jane Smith', text: 'I found the information very helpful.', date: new Date(2024, 4, 10) }, // Simulate a slightly older comment
    { author: 'Alice Walker', text: 'I agree! Looking forward to more content.', date: new Date(2024, 4, 12) }, // Simulate an even newer comment
  ];
  
  new_comment_author: string="";
  new_comment_text: string="";
  

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {}

  //treat content keys to leave only 'paragraph', 'subheader' or 'image'
  ngOnInit(): void {
    this.post=this.data;
    console.log(this.post)
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
