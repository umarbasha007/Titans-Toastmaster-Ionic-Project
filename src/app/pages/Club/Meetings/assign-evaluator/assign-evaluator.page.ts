import { Component, OnInit, Input } from '@angular/core';
import { MeetingService } from '../../../../services/meeting.service';
import { EvaluatorDetails } from '../../../../models/MeetingDetails';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-assign-evaluator',
  templateUrl: './assign-evaluator.page.html',
  styleUrls: ['./assign-evaluator.page.scss'],
})
export class AssignEvaluatorPage implements OnInit {
  @Input() item: EvaluatorDetails;
  public selectedEvaluator = '';
  public evaluatorList: EvaluatorDetails[];
  public itemID: any;
  
  constructor(
    public meetingS: MeetingService,
    public modalCtrl: ModalController,
    public navParams: NavParams, 
  ) {
    this.init();
   }

  ngOnInit() {
  }

  public init(){
    this.itemID = this.navParams.data.itemID;
    this.meetingS.getEvaluatorDetails().subscribe(res=>{
      this.evaluatorList = res;
  });
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

  public mapEvaluator(){
    console.log("itemID:",this.itemID);
    console.log("selectedEvaluator:",this.selectedEvaluator);
      this.meetingS.assignEvalToSpeaker(this.itemID,this.selectedEvaluator);
  }

}
