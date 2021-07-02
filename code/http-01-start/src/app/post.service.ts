import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  error = new Subject<null>();
  constructor(private http: HttpClient) {}

  createPost (title: string, content: string) {
    const postData: Post = { title: title, content: content}
    this.http
      .post<{name: string}>('https://minrun-angular-demo-default-rtdb.firebaseio.com/post.json', postData)
      .subscribe(res => console.log(res), error => this.error.next(error.message));
  }

  getPosts() {
    return this.http
      .get<{ [key: string]: Post }>('https://minrun-angular-demo-default-rtdb.firebaseio.com/post.json')
      .pipe(map(res => {
        let postArray: Post[] = [];
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            postArray.push({...res[key], id: key})
          }
        }
        return postArray;
      }),
      catchError(errorMes => {
        return throwError(errorMes)
      })
      )
  }
  clearPosts() {
    return this.http.delete('https://minrun-angular-demo-default-rtdb.firebaseio.com/post.json')
  }
}