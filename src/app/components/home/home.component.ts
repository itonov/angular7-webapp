import {Component, OnInit} from '@angular/core';

import {User} from '../../shared/interfaces/user';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.authService.currentUserSub.subscribe((user: User) => {
      this.currentUser = user;
    }, error => {
      console.log(error);
    });
  }

}
