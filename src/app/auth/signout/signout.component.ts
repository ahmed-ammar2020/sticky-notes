import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css'],
})
export class SignoutComponent implements OnInit {
  id = 'tsparticles';

  particlesUrl = 'assets/particles.json';

  constructor(private authService: AuthService, private router: Router) {
    const token = localStorage.getItem('token');
    this.authService.signout(token).subscribe(({ message }) => {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/');
    });
  }

  ngOnInit(): void {}
}
