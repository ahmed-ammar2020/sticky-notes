import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AgeFormControl } from '../age-form-control';
import {
  AuthService,
  SignUpResponse,
  SigninCredentials,
} from '../auth.service';
import { tap, switchMap, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  id = 'tsparticles';
  particlesUrl = 'assets/particles.json';
  stopSignal$ = new Subject();
  signupForm = new FormGroup({
    first_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    age: new AgeFormControl('', [Validators.required, Validators.min(18)]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  submitForm() {
    if (this.signupForm.invalid) return;
    this.authService
      .signup(this.signupForm.value)
      .pipe(
        tap(({ message }: SignUpResponse) => {
          if (message != 'success') {
            this.signupForm.controls.email.setErrors({ nonUniqueEmail: true });
            this.stopSignal$.next();
          }
        }),
        takeUntil(this.stopSignal$),
        switchMap(() => {
          const signinCredentials: SigninCredentials = {
            email: this.signupForm.controls.email.value,
            password: this.signupForm.controls.password.value,
          };
          return this.authService.signin(signinCredentials);
        })
      )
      .subscribe(({ token, message }) => {
        if (message === 'success') {
          localStorage.setItem('token', token);
          this.router.navigateByUrl('/profile');
        }
      });
  }
}
