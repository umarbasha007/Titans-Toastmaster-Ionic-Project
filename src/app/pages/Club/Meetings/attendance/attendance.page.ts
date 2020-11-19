import { Component, OnInit } from '@angular/core';
import { UserListService } from '../../../../services/user-list.service';
import { UserSettingService } from '../../../../services/UserSettingService';
import { User } from '../../../../models/user';
import { MeetingService } from '../../../../services/meeting.service';
import { exRoles, meetingRoles } from '../../../../models/UserSetting.model';
import {AttendanceDetails} from '../../../../models/MeetingDetails';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  public userList: User[];
  public attendanceListcount;
  public attendanceList:AttendanceDetails[];
  constructor(
    public userSettingS: UserSettingService,
    public userS: UserListService,
    public meetingS: MeetingService) { 
    this.init();
  }

  public init(){
    this.userS.getUserList().subscribe(res=>{
      this.userList = res;
    });
    this.meetingS.getAttendanceDetails().subscribe(res=>{
      this.attendanceList = res;
      this.attendanceListcount = this.attendanceList.length;
    });
  }

  public markAttending(item){
    this.meetingS.saveAttedance(item);
  }

  public isExcom(){
    if(this.userSettingS.myClub === undefined) { return false; }
    else if(this.userSettingS.myClub.excomRole === exRoles.Vice_President_Education || 
      this.userSettingS.myClub.excomRole === exRoles.President || 
      this.userSettingS.myClub.excomRole === exRoles.Sergeant_At_Arms) 
      {return true;}
  }

  

  ngOnInit() {
  }

}
