import { Injectable } from "@angular/core";
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { UserSetting, Club } from '../models/UserSetting.model';

@Injectable({
    providedIn: 'root'
})
export class UserSettingService {
    public myClub: Club;
    constructor(
        private afStore: AngularFirestore
    ) {
        this.myClub = {} as Club;
        this.getClubDetails();
    }
    
    public getUserSettings() {
        const uid = firebase.auth().currentUser.uid;
        return this.afStore.collection<UserSetting>(`users/${uid}/settings/Club`).snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            })
        );
    }

    private getClubDetails() {
        const uid = firebase.auth().currentUser.uid;
        this.afStore.doc<Club>(`users/${uid}/settings/Club`).valueChanges().subscribe((data) => {
            this.myClub = data;
        });
    }
}
