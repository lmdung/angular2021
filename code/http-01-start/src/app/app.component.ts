import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts()
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    this.http.post('https://minrun-angular-demo-default-rtdb.firebaseio.com/post.json', postData)
      .subscribe(res => console.log(res))

  }

  onFetchPosts() {
    // Send Http request
    this.http.get('https://minrun-angular-demo-default-rtdb.firebaseio.com/post.json')
      .pipe(map(res => {
        let postArray = [];
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            postArray.push({...res[key], id: key})
          }
        }
        return postArray;
      }))
      .subscribe(postArray => console.log(postArray))
  }

  onClearPosts() {
    // Send Http request
  }
}
