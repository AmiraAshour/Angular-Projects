import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tap } from 'rxjs';


function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  console.log('Outgoing Request', request);
  // const req = request.clone({
  //   headers: request.headers.set('Custom-Header', 'CustomHeaderValue')
  // });
  // console.log('Modified Request', req);
  return next(request).pipe(
    tap((response) => console.log('Incoming Response', response)));
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))]
}).catch((err) => console.error(err));
