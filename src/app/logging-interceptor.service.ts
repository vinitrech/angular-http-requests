import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

export class LoggingInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Logging interceptor: " + req);
    console.log(req.url)
    console.log(req.headers)
    return next.handle(req).pipe(tap(event => {
      console.log("Logging incoming response: " + event);
    }));
  }
}
