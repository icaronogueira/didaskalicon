import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../models/post.model';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../api.service';
import { PostPanelComponent } from '../post-panel/post-panel.component';

@Component({
  selector: 'app-blog-grid',
  templateUrl: './blog-grid.component.html',
  styleUrl: './blog-grid.component.css'
})
export class BlogGridComponent implements OnInit {

  posts: Post[] =[];
  currentPage: number=1;
  isLoading: boolean=false;
  cols: number=1;
  rowHeight: string="";
  hasMore: boolean = true;

  @Input() filter:string = "";

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    this.onResize();
  }

  ngOnInit(): void {
    this.getPosts(this.currentPage);
    console.log("on ngOnInit()");
    this.onResize();
  }

  getPosts(page:number) {
    console.log(`on getPosts(${page})`);
    this.isLoading = true;
    this.apiService.getPosts(page)
      .subscribe(posts => {
        console.log("posts: " + posts);
        this.posts = [...this.posts, ...posts];
        this.isLoading = false;
        this.hasMore = (page==1) ? (posts.length == 20) : (posts.length == 10) ;
      });

  }

  onScroll() {
    console.log('onScroll() is being called')
    if (!this.isLoading && this.hasMore) {
      this.currentPage++;
      this.getPosts(this.currentPage);
    }
  }

  onClick(post: any) {
    const dialogRef = this.dialog.open(PostPanelComponent, {
      width: '70%',
      height: '95%',
      data: post,
      autoFocus: false,
      backdropClass: 'dark-backdrop'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Post fechado.');
      //ações a serem feitas após o fechamento do post
    }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 480) {
      this.cols = 1;
      this.rowHeight = "2:3";
    } else if (screenWidth <= 768) {
      this.cols = 2;
      this.rowHeight = "2:3";
    } else {this.cols = 5;
      this.rowHeight = "3:2";
    }
  }
}