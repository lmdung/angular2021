import { Post } from './post.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isLoading: boolean = false;
  error: null;
  private subscription: Subscription
  constructor(
    private postService: PostService,
  ) {}

  ngOnInit() {
    this.subscription = this.postService.error.subscribe(error => {
      this.error = error;
    })
    this.onFetchPosts()
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createPost(postData.title, postData.content)
  }

  onFetchPosts() {
    // Send Http request
    this.isLoading = true;
    this.postService.getPosts()
      .subscribe(posts => {
        this.isLoading = false;
        this.loadedPosts = posts
      }, error => {
        this.isLoading = false;
        this.error = error.message;
      })
    
  }

  onClearPosts() {
    // Send Http request
    this.postService.clearPosts().subscribe(res => {
      this.loadedPosts = [];
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
