import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MeetingService } from '../services/meeting.service';
import {MeetingRoleDetails, enumMeetingRoles, SpeakerDetails, EvaluatorDetails, Meeting, TableTopicDetails, TagRoleDetails} from '../models/MeetingDetails';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { votingDetails, ResultsDetails } from '../models/votingDetails';

@Injectable({
  providedIn: 'root'
})

export class VotingService {
  public speakerList: SpeakerDetails[];
  public SpeakerResultList:ResultsDetails[];
  public evaluatorList: EvaluatorDetails[];
  public tableTopicsList: TableTopicDetails[];
  public meetingDetails: Meeting;
  public URL = 'voting';
  public myVotes = {} as votingDetails;
  private ResultListObservable;
  constructor(
    public db: AngularFirestore,
    public meetingS: MeetingService,
    private afStore: AngularFirestore
    ) { 
    }

    public loadMyVotes(){
      const uid = firebase.auth().currentUser.uid;
      this.afStore.doc<votingDetails>(`voting/${uid}`).valueChanges().subscribe((data) => {
        if(data!=null){
          this.myVotes = data;
        }
      });
    }
  public loadSpeaker(){

    this.meetingS.getSpeakerDetails().subscribe(res=>{
      this.speakerList = res;
    });
  }
  public loadEvaluators(){
    this.meetingS.getEvaluatorDetails().subscribe(res=>{
      this.evaluatorList = res;
    });
  }

  public loadTTSpeaker(){
    this.meetingS.getTableTopicsDetails().subscribe(res=>{
      this.tableTopicsList = res;
    });
  }

  public incrementBestSpeaker(item){
    const uid = firebase.auth().currentUser.uid;
    this.db
       .collection(this.URL)
       .doc(uid)
       .set({ BestSpeaker : item.UserID },{ merge: true });
  }

  public incrementBestEvaluator(item){
    const uid = firebase.auth().currentUser.uid;
       this.db
       .collection(this.URL)
       .doc(uid)
       .set({ BestEvaluator : item.UserID },{ merge: true  });
  }

  public incrementBestTTSpeaker(item){
    const uid = firebase.auth().currentUser.uid;
    this.db
       .collection(this.URL)
       .doc(uid)
       .set({ BestTTSpeaker : item.UserID },{ merge: true  });

  }
  public incrementBestRolePlayer(item){
    const uid = firebase.auth().currentUser.uid;
    this.db
       .collection(this.URL)
       .doc(uid)
       .set({ BestRolePlayer : item.UserID },{ merge: true  });

  }

  public incrementBestTAGPlayer(item){
    const uid = firebase.auth().currentUser.uid;
    this.db
       .collection(this.URL)
       .doc(uid)
       .set({ BestTAGPlayer : item.UserID },{ merge: true  });

  }

  public getVoteDetails() {

    return this.db.collection<votingDetails>('voting').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  public incrementVoteSpeaker(item){
    var url = 'results/CurrentMeeting/BestSpeaker';
      this.db
      .collection(url)	       
      .doc(item)	       
      .set({ voteCount: firebase.firestore.FieldValue.increment(1) },{ merge: true });	     

  }

  public incrementVoteEvaluator(item){
    var url = 'results/CurrentMeeting/BestEvaluator';
      this.db
      .collection(url)	       
      .doc(item)	       
      .set({ voteCount: firebase.firestore.FieldValue.increment(1) },{ merge: true });	     

  }

  public incrementVoteTTSpeaker(item){
    var url = 'results/CurrentMeeting/BestTTSpeaker';
      this.db
      .collection(url)	       
      .doc(item)	       
      .set({ voteCount: firebase.firestore.FieldValue.increment(1) },{ merge: true });	     

  }

  public incrementVoteTAGPlayer(item){
    var url = 'results/CurrentMeeting/BestTAGPlayer';
      this.db
      .collection(url)	       
      .doc(item)	       
      .set({ voteCount: firebase.firestore.FieldValue.increment(1) },{ merge: true });	     

  }

  public incrementVoteRolePlayer(item){
    var url = 'results/CurrentMeeting/BestRolePlayer';
      this.db
      .collection(url)	       
      .doc(item)	       
      .set({ voteCount: firebase.firestore.FieldValue.increment(1) },{ merge: true });	     

  }

  public getSpeakerResultsList(){
    return this.db.collection<ResultsDetails>('results/CurrentMeeting/BestSpeaker').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  public getEvaluatorResultsList(){
    return this.db.collection<ResultsDetails>('results/CurrentMeeting/BestEvaluator').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

  }

  public getTTResultsList(){
    return this.db.collection<ResultsDetails>('results/CurrentMeeting/BestTTSpeaker').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  public getRolePlayerResultsList(){
    return this.db.collection<ResultsDetails>('results/CurrentMeeting/BestRolePlayer').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  public getTAGResultsList(){
    return this.db.collection<ResultsDetails>('results/CurrentMeeting/BestTAGPlayer').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  public getNumberOfVoters(){
    return this.db.collection<votingDetails>('voting').valueChanges();
  }

  public resetVoting(id){
      this.db.collection('voting').doc(id).delete();
  }

  public resultsBackup(BestSpeaker,BestEvaluator,bestTT,bestRole,bestTag,meetinData){
    this.db.collection('Meeting').doc(meetinData.MeetingNo).collection('Results').doc('BestSpeaker').set({BestSpeaker});
    this.db.collection('Meeting').doc(meetinData.MeetingNo).collection('Results').doc('BestEvaluator').set({BestEvaluator});
    this.db.collection('Meeting').doc(meetinData.MeetingNo).collection('Results').doc('bestTT').set({bestTT});
    this.db.collection('Meeting').doc(meetinData.MeetingNo).collection('Results').doc('bestRole').set({bestRole});
    this.db.collection('Meeting').doc(meetinData.MeetingNo).collection('Results').doc('bestTag').set({bestTag});
  }

  public resetResults(){
    this.db.collection('results').doc('CurrentMeeting').delete();
  }

  public updateVotingStatus(status)
  {
    this.db
    .collection('Meeting')
    .doc('NextMeeting')
    .set({votingStatus: !(status)},{merge:true});
  }

  public setVotingStatus(status)
  {
    this.db
    .collection('Meeting')
    .doc('NextMeeting')
    .set({votingStatus: status},{merge:true});
  }

}
