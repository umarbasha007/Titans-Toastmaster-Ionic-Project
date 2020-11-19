import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { UserListService } from '../../../../services/user-list.service';
import { User } from '../../../../models/user';
import { MeetingService } from '../../../../services/meeting.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.page.html',
  styleUrls: ['./admin-settings.page.scss'],
})
export class AdminSettingsPage implements OnInit {
  public itemId: any;
  public selectedUser = '';
  public userList: User[];
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public userListS : UserListService,
    public meetingS: MeetingService,
  ) { 
    this.init();
  }

  public init(){
    this.userListS.getUserList().subscribe(res => {
      this.userList = res;
      }); 
  }

  public reassign(item){
      this.meetingS.assignUserToRole(this.itemId,this.selectedUser);
  }

  ngOnInit() {
    console.table(this.navParams);
    this.itemId = this.navParams.data.itemID;
  }
  async closeModal() {
    await this.modalController.dismiss();
  }
}
