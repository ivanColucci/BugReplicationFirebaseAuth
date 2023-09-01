import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BugReplicationFirebaseAuth';

  constructor(private auth: AuthService) {}

  loginWithGoogle() {
    this.auth.loginWithGoogle().then((_) => console.log('Login riuscito'));
  }
}
