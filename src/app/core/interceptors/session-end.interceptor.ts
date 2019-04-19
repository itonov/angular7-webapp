import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class SessionEndInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private snackbar: MatSnackBar) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const status = error.status;
          const currentRoute = this.router.url;

          if (status === 401 && (currentRoute !== '/auth/login' && currentRoute !== '/home' && currentRoute !== '/')) {
            this.router.navigateByUrl('/auth/login');
            this.snackbar.open('Изтекла сесия. Моля влезте наново!', 'Затвори', {
              duration: 3000,
            });
          }

          return throwError(error);
        })
      );
  }

}
