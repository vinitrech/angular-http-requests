import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Post} from "./post.model";
import {PostsService} from "./posts.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error: string = null;
  private errorSubscription = new Subscription();

  constructor(private httpClient: HttpClient, private postsService: PostsService) {
  }

  ngOnInit() {
    this.onFetchPosts();
    this.errorSubscription = this.postsService.error.subscribe((error) => {
      this.error = error;
      console.log(error);
    });
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.storePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe((posts) => {
      this.loadedPosts = posts;
      this.isFetching = false;
    }, error => { // the second argument of subscribe() is an error-handling function
      this.error = error.statusText;
      this.isFetching = false;
      console.log(error);
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.clearPosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onHandleError() {
    this.error = null;
  }
}
