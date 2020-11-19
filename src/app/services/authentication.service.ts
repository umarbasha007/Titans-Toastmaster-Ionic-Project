import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from "./user";
import { Router } from "@angular/router";
import { auth } from 'firebase/app';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    public router: Router,
    public ngZone: NgZone
  ) {
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  AuthLogin(provider) {
    var that=this;
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function() {
       // var provider = new firebase.auth.GoogleAuthProvider();
        return that.afAuth.signInWithPopup(provider)
          .then((result) => {
            that.ngZone.run(() => {
              that.router.navigate(['Agenda']);
              });
            that.SetUserData(result.user);
          }).catch((error) => {
            window.alert(error);
          })
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }
}
