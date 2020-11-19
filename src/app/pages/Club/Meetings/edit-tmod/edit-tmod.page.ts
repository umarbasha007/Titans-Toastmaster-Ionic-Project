import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { MeetingRoleDetails, Meeting } from '../../../../models/MeetingDetails';

@Component({
  selector: 'app-edit-tmod',
  templateUrl: './edit-tmod.page.html',
  styleUrls: ['./edit-tmod.page.scss'],
})
export class EditTmodPage implements OnInit {
  @Input() item: MeetingRoleDetails;
  @Input() meet: Meeting;
  constructor(navParams: NavParams, public modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  public save() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss(
      {
        save:true,
        meeting:this.meet
    });
  }
  public cancel(){
    this.modalCtrl.dismiss({save:false,meeting:this.meet});
  }
}