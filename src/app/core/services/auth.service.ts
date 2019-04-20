import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../shared/interfaces/user';

const domain = 'http://localhost:9999';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  currentUserSub = new Subject<User>();

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
  }

  initializeAuthState(userData: User) {
    this.currentUser = userData;
    this.currentUserSub.next(userData);
  }

  registerUser(email: string, password: string): Observable<any> {
    return this.http.post(`${domain}/auth/signup`, {
      email,
      password
    });
  }

  loginUser(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${domain}/auth/signin`, {
      email,
      password
    });
  }

  loginRememberedUser(): void {
    const userToken = sessionStorage.getItem('token');
    if (userToken) {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', userToken);
      this.http.post<User>(`${domain}/auth/signin`, {}, {headers})
        .subscribe((data: User) => {
          this.initializeAuthState(data);
        }, (err) => {
          sessionStorage.clear();
        });
    }
  }

  logout(): void {
    this.currentUserSub.next(null);
    this.currentUser = null;
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
