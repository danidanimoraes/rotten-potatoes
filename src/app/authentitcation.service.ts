import { Injectable, EventEmitter } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * The following import fixes this error:
 * 
 * ERROR in src/app/authentitcation.service.ts(5,10): error TS2305:
 * Module /node_modules/firebase/app/index
 * has no exported member 'firebase'.
 * 
 * But then you get this warning on the console:
 * 
 * It looks like you're using the development build of the Firebase JS SDK.
 * When deploying Firebase apps to production, it is advisable to only import
 * the individual SDK components you intend to use.

 * For the module builds, these are available in the following manner
 * (replace <PACKAGE> with the name of a component - i.e. auth, database, etc):

 * CommonJS Modules:
 * const firebase = require('firebase/app');
 * require('firebase/<PACKAGE>');

 * ES Modules:
 * import firebase from 'firebase/app';
 * import 'firebase/<PACKAGE>';
 * 
 * =====
 * This has to do with firebase/angular versions. This is an workaround.
 */
import { auth } from 'firebase';

@Injectable()
export class AuthenticationService implements CanActivate {

  public authState = new EventEmitter<any>();

  canActivate()
  {
    return true;
  }

  constructor(
    public angularFireAuth: AngularFireAuth
  ) { }

  login()
  {
    return this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then(() => {
      this.angularFireAuth.authState.subscribe((user) => this.authState.emit(user));
    });
  }

  logout()
  {
    this.angularFireAuth.auth.signOut();
  }
}
