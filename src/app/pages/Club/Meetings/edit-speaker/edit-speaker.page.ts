import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { SpeakerDetails } from '../../../../models/MeetingDetails';
import { enumPathways, 
        enumLevels , 
        project_Level_1, project_Level_2, project_Level_3, project_Level_4, project_Level_5,
        enumDynamicLeadership, enumEffectiveCoaching, enumEngagingHumor, enumInnovationPlanning,
        enumLeadershipDevelopment, enumMotivationalStrategies, enumPersuasiveInfluence, enumPresentationMastery,
        enumStrategicRelationships, enumTeamCollaboration, enumVisionaryCommunication
      } from '../../../../models/pathwayDetails';

@Component({
  selector: 'app-edit-speaker',
  templateUrl: './edit-speaker.page.html',
  styleUrls: ['./edit-speaker.page.scss'],
})
export class EditSpeakerPage implements OnInit {
  @Input() item: SpeakerDetails;
  public pathwaysList = Object.values(enumPathways).filter(value => typeof value === 'string');
  public DynamicLeadershipList = Object.values(enumDynamicLeadership).filter(value => typeof value === 'string');
  public LevelsList = Object.values(enumLevels).filter(value => typeof value === 'number');
  public projectList;
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

  public setPath(){
    console.log("Selected Path:",this.item.pathWays);
    if(this.item.pathWays=="Dynamic Leadership")
    {
      this.projectList = Object.values(enumDynamicLeadership).filter(value => typeof value === 'string');
    }
    if(this.item.pathWays=="Persuasive Influence")
    {
      this.projectList = Object.values(enumPersuasiveInfluence).filter(value => typeof value === 'string');
    }
    if(this.item.pathWays=="Effective Coaching")
    {
      this.projectList = Object.values(enumEffectiveCoaching).filter(value => typeof value === 'string');
    }
    if(this.item.pathWays=="Engaging Humor")
    {
      this.projectList = Object.values(enumEngagingHumor).filter(value => typeof value === 'string');
    }
    if(this.item.pathWays=="Innovation Planning")
    {
      this.projectList = Object.values(enumInnovationPlanning).filter(value => typeof value === 'string');
    }
    if(this.item.pathWays=="Leadership Development")
    {
      this.projectList = Object.values(enumLeadershipDevelopment).filter(value => typeof value === 'string');
    }
    if(this.item.pathWays=="Motivational Strategies")
    {
      this.projectList = Object.values(enumMotivationalStrategies).filter(value => typeof value === 'string');
    }
    if(this.item.pathWays=="Presentation Mastery")
    {
      this.projectList = Object.values(enumPresentationMastery).filter(value => typeof value === 'string');
    }
    if(this.item.pathWays=="Strategic Relationships")
    {
      this.projectList = Object.values(enumStrategicRelationships).filter(value => typeof value === 'string');
    }
    if(this.item.pathWays=="Team Collaboration")
    {
      this.projectList = Object.values(enumTeamCollaboration).filter(value => typeof value === 'string');
    }
    if(this.item.pathWays=="Visionary Communication")
    {
      this.projectList = Object.values(enumVisionaryCommunication).filter(value => typeof value === 'string');
    }
    
  }

  public setProject(){
    console.log("level:",this.item.level);
  }

  public setPathProject(){

  }
}
