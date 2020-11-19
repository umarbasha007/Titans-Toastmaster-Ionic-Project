import { Component, OnInit } from '@angular/core';
import { UserListService } from '../../../../services/user-list.service';
import { User } from '../../../../models/user';
import { MeetingService } from '../../../../services/meeting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-tt-speaker',
  templateUrl: './enter-tt-speaker.page.html',
  styleUrls: ['./enter-tt-speaker.page.scss'],
})
export class EnterTtSpeakerPage implements OnInit {
  public selectedTTSpeaker = '';
  public userList: User[];
  constructor(
    public userListS : UserListService,
    public meetingS: MeetingService,
    private route: Router,
  ) { 
    this.init();

  }
  public init(){
    this.userListS.getUserList().subscribe(res => {
      this.userList = res;
      }); 
  }

  public addTTSpeakers(){
    //console.log("Selected:",this.selectedTTSpeaker);
    for (let i = 0; i < this.selectedTTSpeaker.length; i++) {
      this.meetingS.saveTTSpeaker(this.selectedTTSpeaker[i]);
    }
  }

  public GoBack(){
    this.route.navigate(['/dashboard']);
  }
  ngOnInit() {
  }

}
