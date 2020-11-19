// dashboard.page.ts
import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ModalController } from '@ionic/angular';

import { MeetingService } from '../../../services/meeting.service';
import { AccomplishmentService } from '../../../services/accomplishment.service';
import { UserSettingService } from '../../../services/UserSettingService';
import { VotingService } from '../../../services/voting.service';

import {MeetingRoleDetails, enumMeetingRoles, SpeakerDetails, EvaluatorDetails, Meeting, TableTopicDetails,AttendanceDetails} from '../../../models/MeetingDetails';
import {Accomplishment} from '../../../models/Accomplishment.model';
import { UserSetting, Club, exRoles } from '../../../models/UserSetting.model';

import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { environment } from '../../../../environments/environment';
import { EditSpeakerPage } from '../Meetings/edit-speaker/edit-speaker.page';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { EditTmodPage } from '../Meetings/edit-tmod/edit-tmod.page';
import { EditWodPage } from '../Meetings/edit-wod/edit-wod.page';
import { PopoverController } from '@ionic/angular';
import { PopovercomponentPage } from '../Meetings/popovercomponent/popovercomponent.page'; 
import domtoimage from 'dom-to-image';
//var domtoimage = require('dom-to-image');
import { AssignEvaluatorPage } from '../Meetings/assign-evaluator/assign-evaluator.page';
import { AdminSettingsPage } from '../Meetings/admin-settings/admin-settings.page';
import { UserListService } from '../../../services/user-list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public meetingRoleList: MeetingRoleDetails[];
  public speakerList: SpeakerDetails[];
  public evaluatorList: EvaluatorDetails[];
  public meetingDetails: Meeting;
  public tableTopicsList: TableTopicDetails[];
  public attendanceList:AttendanceDetails[];
  public notAttendingList:AttendanceDetails[];
  public attendanceListcount;
  public roleTaken = false;
  public speechTaken =false;
  public evaluatorTaken = false;
  public attendance = false;
  public notAttending = false;
  public uid = '';
  public accomplishment;
  public version = '1.1';
  public dataReturned: any;
  public emailDetails: any;
  constructor(
    public db: AngularFirestore,
    public meetingS: MeetingService,
    public accomplishmentS: AccomplishmentService,
    public userSettingS: UserSettingService,
    private route: Router,
    public modalController: ModalController,
    private popover:PopoverController,
    public votingS: VotingService,
    public userS: UserListService,

  ) {
    this.init();
    this.version = environment.Version;
}

public takeScreenShot1(){
  const node = document.getElementById('meetingDetais');

  domtoimage.toPng(node)
    .then(function (dataUrl) {
        //var img = new Image();
        //img.src = dataUrl;
       // document.body.appendChild(img);
        let img : any;
        img= document.querySelector('.screen');
        img.src = dataUrl;
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
}
  public init(){
    this.meetingDetails = {} as Meeting;
    this.meetingS.getMeetingDetails().subscribe(res=> {
      this.meetingDetails = res;
       });
    this.accomplishmentS.getAccomplishment().subscribe(res => {
      this.accomplishment = res;
      this.meetingS.getSpeakerDetails().subscribe(res=>{
        this.speakerList = res;
        this.CheckGivingSpeech();
        this.meetingS.getEvaluatorDetails().subscribe(res=>{
          this.evaluatorList = res;
          this.CheckEvaluator();
		        this.meetingS.getTableTopicsDetails().subscribe(res=>{
          this.tableTopicsList = res;
          this.meetingS.getAttendanceDetails().subscribe(res=>{
          this.attendanceList = res;
          this.attendanceListcount = this.attendanceList.length;
          this.meetingS.getNotAttendingDetails().subscribe(res=>{
            this.notAttendingList = res;
            this.meetingS.getMeetingRoles().subscribe(res => {
            res.sort((a, b) => (a.RoleID > b.RoleID) ? 1 : -1);
            this.meetingRoleList = res;
            this.roleTaken = false;
            this.uid = firebase.auth().currentUser.uid;
            this.meetingRoleList.forEach(meetingElement => {
              if (meetingElement.UserID === this.uid){ 
                  this.roleTaken = true;
              }
              meetingElement.accomplish = {} as Accomplishment;
              if ( this.accomplishment != null ) {
                this.accomplishment.forEach(element => {
                  if(element.RoleName === meetingElement.RoleName){
                    meetingElement.accomplish = element;
                  }
                });
              }
            });
            });
          });
          });
        });
		  });
    });
    });
  }
  public saveMeetingInfo(){
    this.meetingS.saveMeetingInfo(this.meetingDetails);
  }
  public showTimePicker(){
    /*this.datePicker.show({
      date: new Date(),
      mode: 'date',
      we: this.datePicker..THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    ); */
  }
  public assignCurrentUser(item: MeetingRoleDetails){
    if ( item.RoleID-1 === enumMeetingRoles.TMOD) {
      this.editTMOD(item);
    } 
    if( item.RoleID-1 === enumMeetingRoles.Grammarian){
      this.editWOD(item);
    }
    this.meetingS.assignCurrentUser(item);
    this.attendance=true;
    this.meetingS.enterAttedanceforUser();
  }
  public releaseRole(item){
    this.meetingS.releaseRole(item);
    this.roleTaken = false;
  }
  public isExcom(){
    if(this.userSettingS.myClub.excomRole === exRoles.Vice_President_Education || 
      this.userSettingS.myClub.excomRole === exRoles.President || 
      this.userSettingS.myClub.excomRole === exRoles.Sergeant_At_Arms) 
      {return true;}
      else
      { return false; }
  }

  public isVPE(){
    
    if(this.userSettingS.myClub.excomRole === exRoles.Vice_President_Education || 
      this.userSettingS.myClub.excomRole === exRoles.President)
      {return true;}
      else
       { return false; }
  }

  public isMember(){
    if(this.userSettingS.myClub === undefined) { return false; }
    return this.userSettingS.myClub.excomRole === exRoles.member;
  }

  public myClubRole(){
    if(this.userSettingS.myClub == undefined) {
      return exRoles[exRoles.guest];
    }
    if ( this.userSettingS.myClub.excomRole === undefined){
      return exRoles[exRoles.guest];
    }
    return exRoles[this.userSettingS.myClub.excomRole];
  }

  public meetingRoleStr(id){
    id=id-1;
    if ( id < enumMeetingRoles.TMOD && id > enumMeetingRoles.Grammarian){
      return 'UnDefined';
    }
    return enumMeetingRoles[id].replace('_',' ');
  }

  public goToAdminSettings(item)
  {
    //console.log("Reassign for Role: ", item);
    this.reassignRoletoUser(item);
    //this.route.navigate(['/admin-settings']);
  }

  public gotoEducsession(){
    this.route.navigate(['/education-session']);
  }
  ngOnInit() {
   }
   async editSpeakerDetails( item1: SpeakerDetails) {
    const modal = await this.modalController.create({
      component: EditSpeakerPage,
      cssClass: 'my-custom-class',
      componentProps: {
        item: item1
      }
    });
    modal.onDidDismiss().then(data => {
      const data1 = data.data;
      if( data1.save === true){
        this.meetingS.saveSpeechDetails(data1.item, false);
      }
    });
    return await modal.present();
  }
  async createSpeech(){
    const item1  = {} as SpeakerDetails;
    const user = firebase.auth().currentUser;
    item1.Name = user.displayName;
    item1.PhotoUrl= user.photoURL;
    item1.UserID= user.uid;
    item1.email = user.email;
    const modal = await this.modalController.create({
      component: EditSpeakerPage,
      cssClass: 'my-custom-class',
      componentProps: {
        item: item1
      }
    });
    modal.onDidDismiss().then(data => {
      const data1 = data.data;
      const item = data1.item as SpeakerDetails;
      if( data1.save === true){
        this.meetingS.saveSpeechDetails(item, true);
        this.attendance=true;
        this.meetingS.enterAttedanceforUser();
      }
    });
    return await modal.present();
  }
  public deleteSpeechDetails(item){
    this.meetingS.deleteSpeechDetails(item);
  }
  public CheckGivingSpeech(){
    this.speechTaken =false;
    const uid= firebase.auth().currentUser.uid;
    this.speakerList.forEach(element => {
      if(element.UserID === uid) { this.speechTaken= true; }
    });
  }

  public CheckEvaluator(){
    this.evaluatorTaken =false;
    const uid= firebase.auth().currentUser.uid;
    this.evaluatorList.forEach(element => {
      if(element.UserID === uid) { this.evaluatorTaken= true; }
    });
  }
  public deleteEvalDetails(item){
    this.meetingS.deleteEvalDetails(item);
  }
  public createEvalDetails(){
    const item1  = {} as EvaluatorDetails;
    const user = firebase.auth().currentUser;
    item1.Name = user.displayName;
    item1.PhotoUrl= user.photoURL;
    item1.UserID= user.uid;
    item1.email = user.email;
    this.meetingS.saveEvalDetails(item1,true);
    this.attendance=true;
    this.meetingS.enterAttedanceforUser();
  }

  async editTMOD(item1){
    const user = firebase.auth().currentUser;
    item1.Name = user.displayName;
    item1.PhotoUrl= user.photoURL;
    item1.UserID= user.uid;
    if(this.meetingDetails.theme === undefined ) {
      this.meetingDetails.theme = '';
    }
    if(this.meetingDetails.word === undefined ) {
      this.meetingDetails.word = '';
    }
    const modal = await this.modalController.create({
      component: EditTmodPage,
      cssClass: 'my-custom-class',
      componentProps: {
        item: item1,
        meet: this.meetingDetails
      }
    });
    modal.onDidDismiss().then(data => {
      const data1 = data.data;
      const meetingd = data1.meeting  as Meeting;
      if ( data1.save === true){
        this.meetingS.saveMeetingInfo(meetingd);
      }
    });
    return await modal.present();
  }
  async editWOD(item1){
    const user = firebase.auth().currentUser;
    item1.Name = user.displayName;
    item1.PhotoUrl= user.photoURL;
    item1.UserID= user.uid;
    if(this.meetingDetails.word === undefined ) {
      this.meetingDetails.word = '';
    }
    if(this.meetingDetails.theme === undefined ) {
      this.meetingDetails.theme = '';
    }
    const modal = await this.modalController.create({
      component: EditWodPage,
      cssClass: 'my-custom-class',
      componentProps: {
        item: item1,
        meet: this.meetingDetails
      }
    });
    modal.onDidDismiss().then(data => {
      const data1 = data.data;
      const meetingd = data1.meeting  as Meeting;
      if ( data1.save === true){
        this.meetingS.saveMeetingInfo(meetingd);
      }
    });
    return await modal.present();
  }
  async reassignRoletoUser(item)
  {
    const modal = await this.modalController.create({
      component: AdminSettingsPage,
      componentProps: {
        itemID: item
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });
    return await modal.present();
  }

  public goToEnterTTSpeaker(){
    this.route.navigate(['/enter-tt-speaker']);
  }

  public saveAttendance(){
    this.attendance=true;
    this.meetingS.releaseNotAttending();
    this.meetingS.enterAttedanceforUser();
    this.notAttending=false;
  }

  async  startCapture(displayMediaOptions) {
    let captureStream = null;
    try {
      const mediaDevices = navigator.mediaDevices as any;
      captureStream = await mediaDevices.getDisplayMedia(displayMediaOptions);
    } catch(err) {
      console.error('Error: ' + err);
    }
    return captureStream;
  }
public releaseNotAttending(){
  this.attendance = true;
  this.meetingS.releaseNotAttending();
}

public saveNotAttending(){
  this.notAttending=true;
  this.meetingS.releaseAttendance();
  this.meetingS.saveNotAttending();
  this.attendance = false;
}

public checkIfRoleBooked(){
    if(this.roleTaken){
    this.NotAttendingCheck();
    }
    else{
    this.saveNotAttending();
    }
}

public NotAttendingCheck(){
    this.popover.create({component:PopovercomponentPage,
    showBackdrop:false}).then((popoverElement)=>{
      popoverElement.present();
    });
}

async setEvaluator(item){
  console.log("item:",item);
  const modal = await this.modalController.create({
    component: AssignEvaluatorPage,
    componentProps: {
      'itemID': item
    }
  });

  modal.onDidDismiss().then((dataReturned) => {
    if (dataReturned !== null) {
      this.dataReturned = dataReturned.data;
    }
  });
  return await modal.present();
}

public closeMeeting(){
  this.meetingS.backupMeetingData(this.speakerList,this.evaluatorList,this.meetingRoleList,this.attendanceList,this.tableTopicsList,this.meetingDetails);
  }

  public openNewMeeting(){
    this.meetingRoleList.forEach(element => {
      this.meetingS.releaseRole(element);
    }); 
    this.speakerList.forEach(element => {
      this.meetingS.deleteSpeechDetails(element);
    });
    this.evaluatorList.forEach(evaluator => {
      this.meetingS.deleteEvalDetails(evaluator);
    });
    this.attendanceList.forEach(attendance => {
      this.meetingS.releaseAllAttendance(attendance.UserID);
    })
    this.notAttendingList.forEach(leave => {
      this.meetingS.releaseAllLeave(leave.UserID);
    })
    this.tableTopicsList.forEach(ttspeaker => {
      this.meetingS.deleteTTspeaker(ttspeaker.UserID);
    })
  }

}
