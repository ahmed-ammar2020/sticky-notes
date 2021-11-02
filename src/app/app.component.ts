import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  faStickyNote = faStickyNote;
  signedin$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.signedin$ = this.authService.signedin$;
    if (localStorage.getItem('token')) {
      this.authService.signedin$.next(true);
      this.router.navigateByUrl('/profile');
      this.authService.userToken = localStorage.getItem('token');
      this.authService.citizenID = jwt_decode(localStorage.getItem('token'));
    } else {
      this.authService.signedin$.next(false);
    }
  }
}
