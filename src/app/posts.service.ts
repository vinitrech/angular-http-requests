import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Post} from "./post.model";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(private httpClient: HttpClient) {
  }

  storePost(title: string, content: string) {
    const postData: Post = {
      title: title,
      content: content
    }

    this.httpClient.post<{ name: string }>('https://angular-http-requests-7afaf-default-rtdb.firebaseio.com/posts.json', postData) // angular will convert the postData to json automatically
      .subscribe(responseData => { // post will not work if there is no subscription to the resulting observable
        console.log(responseData); // responseData is the response's body extracted automatically
      });

    // Posts send 2 requests, the first one is of type OPTIONS, to check if post method is allowed. If so,
    // the post request is made.
  }

  fetchPosts() {
    return this.httpClient.get<{ [key: string]: Post }>('https://angular-http-requests-7afaf-default-rtdb.firebaseio.com/posts.json') // this indicates that the response will be an object with a random string as a key, and it's type is Post
      .pipe(map((responseData) => { // the response data type is the one specified in the get() method
        const postsArray: Post[] = []

        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            // postsArray.push(responseData[key]); << push the object direct to array
            postsArray.push({id: key, ...responseData[key]}); // pushes an object with the key and every field of the response[key]
          }
        }

        return postsArray;
      })); // the subscription will happen in the component
    // .subscribe(posts => {
    //
    // });
  }
}
