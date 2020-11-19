import { Injectable, NgZone } from "@angular/core";
import 'firebase/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { MeetingRoleDetails, SpeakerDetails, EvaluatorDetails, Meeting, TableTopicDetails,TagRoleDetails,enumMeetingRoles,AttendanceDetails } from '../models/MeetingDetails';
import { collectExternalReferences } from '@angular/compiler';
import { clubDetails } from '../models/clubDetails';
@Injectable({
  providedIn: 'root'
})
export class MeetingService {
public meetingRoles: MeetingRoleDetails[];
private meetingRoleObservable;
private tagRoleObservable;
public TagList: Array<TagRoleDetails> = []; 
constructor(
    public db: AngularFirestore,
    private afStore: AngularFirestore
  ) {
    this.getMeetingRoles();
  }
  public getMeetingRoles() {
    if(this.meetingRoleObservable !==undefined){
      return this.meetingRoleObservable;
    }
    this.meetingRoleObservable =this.db.collection<MeetingRoleDetails>('Meeting/NextMeeting/Roles').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.meetingRoleObservable.subscribe(res => {
      this.meetingRoles = res;
    });
    return this.meetingRoleObservable;
  }

  public getSpeakerDetails() {
    return this.db.collection<SpeakerDetails>('Meeting/NextMeeting/Speakers').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  public getMeetingDetails() {
    return this.afStore.doc<Meeting>(`Meeting/NextMeeting/`).valueChanges();
  }

  public saveMeetingInfo(item : Meeting){
    this.db
       .collection('Meeting/')
       .doc('NextMeeting')
       .set({ MeetingNo: item.MeetingNo, MeetingDetails: item.MeetingDetails,MeetingTime : item.MeetingTime, 
        theme:item.theme,word:item.word,zoomId:item.zoomId,zoomPwd:item.zoomPwd }, { merge: true });
    } 
  
  public getEvaluatorDetails() {
    return this.db.collection<EvaluatorDetails>('Meeting/NextMeeting/EvaluatorDetails').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  public saveEvalDetails(item: EvaluatorDetails, create: boolean){
    if (create){
      this.db
      .collection('Meeting/NextMeeting/EvaluatorDetails')
      .add({ Name: item.Name, PhotoUrl: item.PhotoUrl, UserID : item.UserID, email: item.email });
    } else {
    this.db
       .collection('Meeting/NextMeeting/EvaluatorDetails')
       .doc(item.id)
       .set({  }, { merge: true });
    }
  }

  public deleteEvalDetails(item: EvaluatorDetails){
      this.db
      .collection('Meeting/NextMeeting/EvaluatorDetails')
      .doc(item.id).delete();
  }

  public saveSpeechDetails(item: SpeakerDetails, create: boolean){
    if (create){
      this.db
      .collection('Meeting/NextMeeting/Speakers')
      .add({ pathWays: item.pathWays , speechTitle: item.speechTitle, level: item.level+1, project: item.project,
        Name: item.Name, PhotoUrl: item.PhotoUrl, UserID : item.UserID, email: item.email });
    } else {
    this.db
       .collection('Meeting/NextMeeting/Speakers')
       .doc(item.id)
       .set({ pathWays: item.pathWays , speechTitle: item.speechTitle }, { merge: true });
    }
  }

  public deleteSpeechDetails(item: SpeakerDetails){
      this.db
      .collection('Meeting/NextMeeting/Speakers')
      .doc(item.id).delete();
  }

  public assignCurrentUser(item: MeetingRoleDetails){
    const name = firebase.auth().currentUser.displayName;
    const uid = firebase.auth().currentUser.uid;
    const photourl = firebase.auth().currentUser.photoURL;
    const email = firebase.auth().currentUser.email;
    this.db
       .collection('Meeting/NextMeeting/Roles')
       .doc(item.id)
       .set({ Name: name , UserID: uid, PhotoUrl: photourl, RoleID: item.RoleID, email: email }, { merge: true });
  }

  public releaseRole(item){
    if(item.RoleID-1 == enumMeetingRoles.TMOD)
    {
      this.db
       .collection('Meeting/')
       .doc('NextMeeting')
       .set({ theme: '' }, { merge: true });
    }
    if(item.RoleID-1 == enumMeetingRoles.Grammarian)
    {
      this.db
       .collection('Meeting/')
       .doc('NextMeeting')
       .set({ word: '' }, { merge: true });
    }
    this.db
       .collection('Meeting/NextMeeting/Roles')
       .doc(item.id)
       .set({ Name: '' , UserID: '' ,PhotoUrl: '', email:''}, { merge: true });
  }

  public assignUserToRole(item, user){
    this.db
      .collection('Meeting/NextMeeting/Roles')
      .doc(item.id)
      .set({Name: user.displayName , UserID: user.uid, RoleID: item.RoleID, PhotoUrl: user.photoURL, email: user.email}, { merge: true});
  }
  
  public getTableTopicsDetails() {
    return this.db.collection<TableTopicDetails>('Meeting/NextMeeting/TableTopics').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  public saveTTSpeaker(item){
      this.db
      .collection('Meeting/NextMeeting/TableTopics')
      .doc(item.uid)
      .set({Name: item.displayName , UserID: item.uid, PhotoUrl: item.photoURL}, { merge: true });
    } 

  public deleteTTspeaker(uid){
    this.db
    .collection('Meeting/NextMeeting/TableTopics')
    .doc(uid)
    .delete();
  }
  
  public enterAttedanceforUser(){
    const name = firebase.auth().currentUser.displayName;
    const uid = firebase.auth().currentUser.uid;
    const photourl = firebase.auth().currentUser.photoURL;
    this.db
       .collection('Meeting/NextMeeting/Attendance')
       .doc(uid)
       .set({ Name: name , UserID: uid, PhotoUrl: photourl }, { merge: true });
  }

  public saveAttedance(item){
    this.db
       .collection('Meeting/NextMeeting/Attendance')
       .doc(item.uid)
       .set({Name: item.displayName , UserID: item.uid, PhotoUrl: item.photoURL}, { merge: true });
  }

  public getAttendanceDetails() {
    return this.db.collection<TableTopicDetails>('Meeting/NextMeeting/Attendance').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  public releaseAttendance(){
    const name = firebase.auth().currentUser.displayName;
    const uid = firebase.auth().currentUser.uid;
    this.db
       .collection('Meeting/NextMeeting/Attendance')
       .doc(uid)
       .delete();
  }

  public releaseAllAttendance(uid){
    this.db
       .collection('Meeting/NextMeeting/Attendance')
       .doc(uid)
       .delete();
  }

  public releaseAllLeave(uid){
    this.db
       .collection('Meeting/NextMeeting/Leave')
       .doc(uid)
       .delete();
  }
  public saveNotAttending(){
    const name = firebase.auth().currentUser.displayName;
    const uid = firebase.auth().currentUser.uid;
    const photourl = firebase.auth().currentUser.photoURL;
    this.db
       .collection('Meeting/NextMeeting/Leave')
       .doc(uid)
       .set({ Name: name , UserID: uid, PhotoUrl: photourl }, { merge: true });
  }

  public getNotAttendingDetails() {
    return this.db.collection<TableTopicDetails>('Meeting/NextMeeting/Leave').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  } 

  public releaseNotAttending(){
    const name = firebase.auth().currentUser.displayName;
    const uid = firebase.auth().currentUser.uid;
    this.db
       .collection('Meeting/NextMeeting/Leave')
       .doc(uid)
       .delete();
  }

  public assignEvalToSpeaker(item, user){
    this.db
      .collection('Meeting/NextMeeting/EvaluatorDetails')
      .doc(user.id)
      .set({Speaker: item.Name }, { merge: true});
  }

  public getClubDetails(){
    return this.afStore.doc<clubDetails>(`Club/details/`).valueChanges();
  }

  public backupMeetingData(speakerData,evaluatorData,rolesData,attendanceData,TTData,meetingData){
    this.db.collection('Meeting').doc(meetingData.MeetingNo).collection('Speakers').add({speakerData});
    this.db.collection('Meeting').doc(meetingData.MeetingNo).collection('Evaluators').add({evaluatorData});
    this.db.collection('Meeting').doc(meetingData.MeetingNo).collection('Roles').add({rolesData});
    this.db.collection('Meeting').doc(meetingData.MeetingNo).collection('TableTopics').add({TTData});
    this.db.collection('Meeting').doc(meetingData.MeetingNo).collection('Attendance').add({attendanceData});
  }
}
