import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../core/services/auth.service';
import {User} from '../../../shared/interfaces/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  currentUser: User;
  isLoggedSub: Subscription;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.isLoggedSub = this.authService.currentUserSub.subscribe((data: User) => {
      this.currentUser = data;
    });
  }

  ngOnDestroy() {
    this.isLoggedSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

}
