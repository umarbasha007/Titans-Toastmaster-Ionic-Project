import { Injectable } from '@angular/core';
import 'firebase/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { club } from '../models/club.model';
import { Observable } from 'rxjs';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { EnumMemberType } from '../models/club.model';
import { UserSetting, Club } from '../models/UserSetting.model';
import { UserProfileService } from './user-profile.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalModelServiceService {
  public myClubObv: Observable<Club>;
  public myClub: Club;
  public defaultbaseClub = "TrzKXULDkKxYxMttukkg";

  constructor(
      public router: Router,
      public afStore: AngularFirestore,
      public UserProfileS: UserProfileService,

      )
  {
      this.myClub = {baseClub: '' } as Club;
  }

  public getCurrentUserId()
  {
      const userId = firebase.auth().currentUser.uid;
      if ( userId === undefined )
      {
        this.router.navigate(['login']);
        return;
      }
      else if (userId === '')
      {
        this.router.navigate(['login']);
        return;
      }
      else
      {
        return userId;
      }
  }

  public getClubId() 
  {
    const uid = this.getCurrentUserId();
    this.UserProfileS.userSetting$.subscribe(res=> {
      this.myClub = res;
      if ( this.myClub.memberType===EnumMemberType.member && this.myClub.baseClub === undefined || this.myClub.memberType===EnumMemberType.member && this.myClub.baseClub === '')
      {
          this.router.navigate(['register']);
          return;
      }
      else if(this.myClub.memberType===EnumMemberType.guest)
      {
        return this.defaultbaseClub;
      }
      else
      {
        return this.myClub.baseClub;
      }
    });
  }
}
