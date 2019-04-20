import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {MustMatch} from './must-match.validator';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword'),
    });
  }

  get formControls() {
    return this.form.controls;
  }

  register() {
    if (this.form.valid) {
      this.authService.registerUser(this.formControls.email.value, this.formControls.password.value)
        .subscribe((data) => {
          this.router.navigate(['/auth/login']);
        }, (err) => {
          console.log(err.status)
          if (err.status === 422) {
            this.snackbar.open('Потребителя вече съществува.', 'Затвори', {
              duration: 3000,
            });
          }
        });
    }
  }
}
