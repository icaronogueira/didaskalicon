import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Post } from './models/post.model';
import { Comment } from './models/comments.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://didaskalicon-api.onrender.com/api';

  constructor(private http: HttpClient) { }

  //Function to get all posts
  getPosts(page: number): Observable<Post[]> {
    console.log("in function apiService.getPosts()");
    return this.http.get<Post[]>(`${this.baseUrl}/posts/${page}`)
      .pipe(catchError(this.handleError));
  }

  //Function to get a specific post
  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`)
      .pipe(catchError(this.handleError));
  }

  //Function to get comments for a specific post
  getPostComments(postId:string): Observable<Comment[]> {
    console.log('Calling getPostComments with post._id: '+postId)
    return this.http.get<Comment[]>(`${this.baseUrl}/posts/${postId}/comments`)
      .pipe(
        map((response) => {
          console.log('http get response: ', response);
          return response;
        }),
        catchError(this.handleError));
  }

  //Function to get posts with a specific tag
  getPostsByTag(tag:string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts/tag/${tag}`)
      .pipe(catchError(this.handleError));
  }

  //Function to create a comment
  saveComment(comment: Comment): Observable<any> {
    console.log("on api.service.td saveComment() " + comment);
    return this.http.post(`${this.baseUrl}/comments`, {
      author: comment.author,
      text: comment.text,
      post_id: comment.post_id
    })
      .pipe(catchError(this.handleError));
  }
  
  //Function to like a post
  likePost(postId: string): Observable<any> {
    return this.http.put<Post>(`${this.baseUrl}/posts/${postId}/like`, {})
    .pipe(catchError(this.handleError));
  }


  //Function to dislike a post
  dislikePost(postId: string): Observable<any> {
    return this.http.put<Post>(`${this.baseUrl}/posts/${postId}/dislike`, {})
    .pipe(catchError(this.handleError));
  }

  //Error handling function
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

}
