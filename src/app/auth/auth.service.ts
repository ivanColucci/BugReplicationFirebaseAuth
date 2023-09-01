import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, authState } from '@angular/fire/auth';
import { Observable, of, Subject } from 'rxjs';

export interface FHToken {
  token: string,
  expires: Date
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {
  }

  /* Performs user authentication using Google */
  async loginWithGoogle() {
    signInWithPopup(this.auth, new GoogleAuthProvider()).then((credentials) => {
      if (credentials.user) {
        console.log('Credentials obtained:', credentials);
      }
    });
  }

  /* Gets the token observer */
  getToken(): Observable<FHToken | null> {
    const user = this.auth.currentUser;
    authState(this.auth).subscribe((userData) => console.log('UserData:', userData));
    if (user) {
      const subject = new Subject<FHToken>;
      user.getIdTokenResult().then((tokenResult) => {
        const token: FHToken = {
          token: tokenResult.token,
          expires: new Date(tokenResult.expirationTime)
        }
        subject.next(token);
      });
      return subject.asObservable();
    } else {
      return of(null);
    }
  }
}
