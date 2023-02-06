import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (req.url !== "https://google.com")  <- prevent the code from running for certain urls
    // console.log("Requesting url: " + req.url);
    const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')}) // modify request before forwarding
    return next.handle(modifiedRequest)
    //   .pipe(tap(response => { // handling response from the request
    //   console.log("Handling response: " + response);
    //
    //   if (response.type === HttpEventType.Response) {
    //     console.log("Response: " + response.body);
    //   }
    // }));
  }
}
