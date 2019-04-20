import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../../../core/services/auth.service';
import {User} from '../../../shared/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackbar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [''],
    });
  }

  get formControls() {
    return this.form.controls;
  }

  login() {
    if (this.form.valid) {
      this.authService.loginUser(this.formControls.email.value, this.formControls.password.value)
        .subscribe((data: User) => {
          this.authService.initializeAuthState(data);
          if (this.formControls.rememberMe) {
            sessionStorage.setItem('token', data.token);
          }
          this.router.navigate(['/home']);
        }, (err) => {
          if (err.status === 401) {
            this.snackbar.open('Невалиден имейл или парола.', 'Затвори', {
              duration: 3000,
            });
          }
        });
    }
  }

}
