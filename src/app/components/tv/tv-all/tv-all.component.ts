import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Tv} from '../../../shared/interfaces/tv';
import {TvService} from '../../../core/services/tv.service';
import {AuthService} from '../../../core/services/auth.service';
import {User} from '../../../shared/interfaces/user';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-tv-all',
  templateUrl: './tv-all.component.html',
  styleUrls: ['./tv-all.component.css']
})
export class TvAllComponent implements OnInit {
  allTvs$: Observable<Array<Tv>>;
  user: User;

  constructor(private tvService: TvService,
              private authService: AuthService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.allTvs$ = this.tvService.getAllTvs();
    this.user = this.authService.currentUser;
    this.authService.currentUserSub.subscribe((user: User) => {
      this.user = user;
    }, error => {
      console.log(error);
    });
  }

  handleDelete(tv: Tv) {
    console.log(tv);
    this.tvService.deleteTv(tv._id).subscribe(() => {
      this.allTvs$ = this.tvService.getAllTvs();
      this.snackBar.open(`Обявата е изтрита успешно!`, 'Затвори', {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
  }
}
