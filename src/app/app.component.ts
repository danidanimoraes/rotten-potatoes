import { Component, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from './authentitcation.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = 'app';

  constructor(
    public authService: AuthenticationService
  ){
  }

  login(): void
  {
    this.authService.login();
  }

  logout(): void
  {
    this.authService.logout();
  }
}
