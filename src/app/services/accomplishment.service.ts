import { Injectable, NgZone } from "@angular/core";
import 'firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Accomplishment } from '../models/Accomplishment.model';
@Injectable({
  providedIn: 'root'
})
export class AccomplishmentService {
  constructor(
    public db: AngularFirestore,
  ) {
  }
  public getAccomplishment() {
    const uid = firebase.auth().currentUser.uid;
    return this.db.collection<Accomplishment>('users/' + uid + '/RoleAccomplishment').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
