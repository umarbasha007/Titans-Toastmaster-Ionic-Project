import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { Club } from '../models/UserSetting.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  public userSetting$: Observable<Club>;
  public userSetting:Club;
  public baseClub:string;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { 
    /*const userId = firebase.auth().currentUser.uid;
    let docRef = this.afs.doc<Club>(`users/${userId}/settings/Club`);
    docRef.ref.get().then((doc)=> {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        let myData=doc.data();
        this.baseClub= myData.baseClub;//return true or false
        console.log("baseClub:",this.baseClub);
        if(this.baseClub)
        {
          console.log("Returning true");
          this.router.navigate(['NewsFeed']);
          return this.baseClub;
        }
        else{
          console.log("Returning false");
          this.router.navigate(['register']);
          return "NULL";
      }  
      } else {
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});*/
  }

  public isClubRegistered():any{
    const userId = firebase.auth().currentUser.uid;
    let docRef = this.afs.doc<Club>(`users/${userId}/settings/Club`);
    docRef.ref.get().then((doc)=> {
        let myData=doc.data();
        if(myData != undefined){
          this.baseClub= myData.baseClub;
        }
        
    if(this.baseClub)
    {
      this.router.navigate(['NewsFeed']);
      return this.baseClub;
    }
    else{
      this.router.navigate(['register']);
      return "NULL";
  }  
    });
    
  }
}
