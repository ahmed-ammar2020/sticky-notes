import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  id = 'tsparticles';

  particlesUrl = 'assets/particles.json';

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  submitForm() {
    if (this.signinForm.invalid) return;
    this.authService
      .signin(this.signinForm.value)
      .subscribe(({ message, token }) => {
        if (message !== 'success') {
          this.signinForm.setErrors({ invalidUorP: true });
        } else {
          this.router.navigateByUrl('/profile');
          localStorage.setItem('token', token);
        }
      });
  }
}
