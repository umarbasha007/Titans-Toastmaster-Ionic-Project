import { Injectable } from '@angular/core';
import { educationSession, uploadPicture } from '../models/educationsession.model';
import { map } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class EducationSessionnService {
  private SessionListObservable;
  public sessionList: educationSession[];
  task: AngularFireUploadTask;
  fileName:string;
  private todaySessionListObservable;

  private imageCollection: AngularFirestoreCollection<uploadPicture>;
  constructor(
    public db: AngularFirestore,
    private storage: AngularFireStorage, 
  ) 
  { 
    this.getSessionList();
    this.imageCollection = db.collection<uploadPicture>('educationSession');
  }

  public deleteSession(item){
    this.db
      .collection('educationSession')
      .doc(item.id).delete();
  }

  public saveMeetingInfo(item : educationSession)
  {
    const splitedDate = item.date.split('T');
    const ymd = splitedDate[0];
    const year = ymd.split('-')[0];
    const month = ymd.split('-')[1];
    const date = ymd.split('-')[2];
    const uid = firebase.auth().currentUser.uid;
    const splitedTime = item.startTime.split('T');
    const starttime = splitedTime[1];
    const splittedstarthm = starttime.split(':');
    const starthr = splittedstarthm[0];
    const startmin = splittedstarthm[1];
    const splitedendTime = item.endTime.split('T');
    const endtime = splitedendTime[1];
    const splittedendhm = endtime.split(':');
    const endhr = splittedendhm[0];
    const endmin = splittedendhm[1];
    this.db
      .collection(`educationSession`)
      .add({ 
      clubName: item.clubName,
      title: item.title,
      speaker: item.speaker,
      date: date + "-" + month + "-" + year,
      startTime: starthr+":"+startmin,
      endTime: endhr+":"+endmin+" IST",
      app: item.app,
      meetinglink: item.meetinglink,
      facebooklink: item.facebooklink,
      createdBy: uid,
      phoneNumber:item.phoneNumber,
      });
  } 
  
    public getSessionList()
    {
      if(this.SessionListObservable !==undefined){
        return this.SessionListObservable;
      }
      this.SessionListObservable = this.db.collection<educationSession>('educationSession',ref=> ref.orderBy('date','asc')).snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
      this.SessionListObservable.subscribe(res => {
        this.sessionList = res;
    });
      return this.SessionListObservable;
    }

    public getTodaySessionList()
    {
      if(this.todaySessionListObservable !==undefined){
        return this.todaySessionListObservable;
      }
      var endOfToday = Date.now(); 
      this.todaySessionListObservable = this.db.collection<educationSession>('educationSession',ref=> ref.where('date', '==', endOfToday)).snapshotChanges().pipe(

        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
      return this.todaySessionListObservable;
    }

    uploadFile(event: FileList) 
    {
      const file = event.item(0)
      if (file.type.split('/')[0] !== 'image') { 
       console.error('unsupported file type :( ')
       return;
      }
      this.fileName = file.name;
      const path = `educationSession/${file.name}`;
      const customMetadata = { app: 'Education Session Image Upload' };
      const fileRef = this.storage.ref(path);
      this.task = this.storage.upload(path, file, { customMetadata });
      return path;
    }
}
