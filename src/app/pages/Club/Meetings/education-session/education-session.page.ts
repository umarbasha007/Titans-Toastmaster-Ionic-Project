import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { EducationSessionnService } from '../../../../services/education-sessionn.service';
import { educationSession,educationSessionClass } from '../../../../models/educationsession.model';
import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { EnterEducationSessionPage } from '../enter-education-session/enter-education-session.page';
import { UserSettingService } from '../../../../services/UserSettingService';
import { UserSetting, Club, exRoles, meetingRoles } from '../../../../models/UserSetting.model';

@Component({
  selector: 'app-education-session',
  templateUrl: './education-session.page.html',
  styleUrls: ['./education-session.page.scss'],
})

export class EducationSessionPage implements OnInit {
  isUploading:boolean;
  isUploaded:boolean;
  public imgsrc_edu_session ='assets/eSession.PNG';
  public imgsrc_edu_speaker = 'https://firebasestorage.googleapis.com/v0/b/walkietalkienaganallur-test.appspot.com/o/educationSession%2FDSC_0016.JPG?alt=media&token=dd067629-46ba-4c44-b4d5-9ad99e1f94c6';
  public filepath;
  public create = false;
  public today = false;
  public allSession = true;
  public uid = '';
  newSession = new educationSessionClass();
  public sessionList: educationSession[];
  public todaySessionList: educationSession[];
  constructor(
    public eSessionServ: EducationSessionnService,
    private storage: AngularFireStorage, 
    private database: AngularFirestore,
    public modalController: ModalController,
    public userSettingS:UserSettingService,
  ) { 
    this.isUploading = false;
    this.isUploaded = false;
    this.init();
  }

  public DisplayToday(){
    this.today = true;
    this.allSession=false;
    console.log("making today true");
  }

  public deleteSession(item){
    this.eSessionServ.deleteSession(item);
  }

  public uploadFile(event: FileList){
    const file = event.item(0);
    //this.filepath = this.eSessionServ.uploadFile(event);
      //this.isUploading = true;
  }

  public init() 
  {
    this.uid = firebase.auth().currentUser.uid;
    this.eSessionServ.getSessionList().subscribe(res => {
    this.sessionList = res;
    }); 
  }
  ngOnInit() {
  }

  addMySession(){
    this.create = false;
    this.eSessionServ.saveMeetingInfo(this.newSession);
   }

   public isESessionAdmin(){
    if(this.userSettingS.myClub === undefined) { 
      return false; }
    return this.userSettingS.myClub.meetingRole === meetingRoles.ESessionAdmin;
  }

   public isExcom(){
    if(this.userSettingS.myClub.excomRole === exRoles.Vice_President_Education || 
      this.userSettingS.myClub.excomRole === exRoles.President || 
      this.userSettingS.myClub.excomRole === exRoles.Sergeant_At_Arms) 
      {return true;}
      else
      { return false; }
  }

   async CreateSession(){
    const item1  = {} as educationSession;
    
    const modal = await this.modalController.create({
      component: EnterEducationSessionPage,
      cssClass: 'my-custom-class',
      componentProps: {
        item: item1
      }
    });
    modal.onDidDismiss().then(data => {
      const data1 = data.data;
      const item = data1.item as educationSession;
      if( data1.save === true){
        this.eSessionServ.saveMeetingInfo(data1.item);
      }
    });
    return await modal.present();
  }

}
