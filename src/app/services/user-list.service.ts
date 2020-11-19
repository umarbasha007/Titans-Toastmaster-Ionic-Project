import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  private userListObservable;
  public userList: User[];
  constructor(
    public db: AngularFirestore,
  ) {
    this.getUserList(); 
  }
  
  public getUserList() {
    if(this.userListObservable !==undefined){
      return this.userListObservable;
    }
    this.userListObservable = this.db.collection<User>('users',ref=> ref.orderBy("displayName","asc")).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  this.userListObservable.subscribe(res => {
    this.userList = res;
  });
  return this.userListObservable;
  }

  public getUsername(uid){
    const URL = 'users/' + uid;
      return this.db.doc<User>(URL).valueChanges();
  }
}
