import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { educationSession,educationSessionClass } from '../../../../models/educationsession.model';
@Component({
  selector: 'app-enter-education-session',
  templateUrl: './enter-education-session.page.html',
  styleUrls: ['./enter-education-session.page.scss'],
})
export class EnterEducationSessionPage implements OnInit {
  @Input() item: educationSession;
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
        item:this.item
    });
  }
  public cancel(){
    this.modalCtrl.dismiss({save:false,item:this.item});
  }

}
