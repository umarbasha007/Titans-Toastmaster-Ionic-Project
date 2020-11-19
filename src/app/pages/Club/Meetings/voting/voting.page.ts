import { Component, OnInit } from '@angular/core';
import {MeetingRoleDetails, enumMeetingRoles, SpeakerDetails, EvaluatorDetails, Meeting, TableTopicDetails, TagRoleDetails} from '../../../../models/MeetingDetails';
import { MeetingService } from '../../../../services/meeting.service';
import { UserSettingService } from "../../../../services/UserSettingService";
import { VotingService } from '../../../../services/voting.service';
import { votingDetails } from '../../../../models/votingDetails';
import { exRoles } from '../../../../models/UserSetting.model';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.page.html',
  styleUrls: ['./voting.page.scss'],
})
export class VotingPage implements OnInit {
  public meetingRoleList: MeetingRoleDetails[];
  public speakerList: SpeakerDetails[];
  public evaluatorList: EvaluatorDetails[];
  public tableTopicsList: TableTopicDetails[];
  public meetingDetails: Meeting;
  public bestSpeakerList: EvaluatorDetails[];
  public totalVotersCount: number;
  public voteSpeaker = false;
  public voteEvaluator = false;
  public voteTTSpeaker = false;
  public voteTagRole = false;
  public voteRolePlayer = false;
  constructor(
    public meetingS: MeetingService,
    public userSettingS: UserSettingService,
    public votingS: VotingService,
    ) {
    this.init();
   }

  public voteforBestSpeaker(item){
    this.voteSpeaker = true;
    this.votingS.incrementBestSpeaker(item);
  }

  public voteforBestEvaluator(item){
    this.voteEvaluator = true;
    this.votingS.incrementBestEvaluator(item);
  }

  public voteforBestTTSpeaker(item){
    this.voteTTSpeaker = true;
    this.votingS.incrementBestTTSpeaker(item);
  }

  public voteforBestRolePlayer(item){
    this.voteRolePlayer = true;
    this.votingS.incrementBestRolePlayer(item);
  }

  public voteforBestTAGPlayer(item){
    this.voteTagRole = true;
    this.votingS.incrementBestTAGPlayer(item);
  }

  public init(){
    this.meetingS.getSpeakerDetails().subscribe(res=>{
      this.speakerList = res;
    });
    this.meetingS.getEvaluatorDetails().subscribe(res=>{
      this.evaluatorList = res;
    });
    this.meetingS.getTableTopicsDetails().subscribe(res=>{
      this.tableTopicsList = res;
    });
    this.meetingDetails = {} as Meeting;
    this.meetingS.getMeetingDetails().subscribe(res=> {
      this.meetingDetails = res;
    });
    this.votingS.getNumberOfVoters().subscribe(res=> {
      this.totalVotersCount = res.length;
    });
    this.votingS.loadMyVotes();
  }

  public meetingRoleStr(id){
    id=id-1;
    if ( id < enumMeetingRoles.TMOD && id > enumMeetingRoles.Grammarian){
      return 'UnDefined';
    }
    return enumMeetingRoles[id];
  }

  ngOnInit() {
  }

  public StartVoting()
  {
    this.resetVoting();
    this.votingS.updateVotingStatus(this.meetingDetails.votingStatus);
  }

  public StopVoting()
  {
    this.votingS.updateVotingStatus(this.meetingDetails.votingStatus);
    this.votingS.resetResults();
    this.votingS.getVoteDetails().subscribe(res=>{
      res.forEach(element => { 
          this.countVote(element);
      });
    });
  }


  public isExcom()
  {
    if(this.userSettingS.myClub === undefined) { return false; }
    return this.userSettingS.myClub.excomRole === exRoles.Vice_President_Education;
  }

   public countVote(element){
     if(element.BestSpeaker!=null){
      this.votingS.incrementVoteSpeaker(element.BestSpeaker);}
      if(element.BestEvaluator!=null){
      this.votingS.incrementVoteEvaluator(element.BestEvaluator);}
      if(element.BestRolePlayer!=null){
      this.votingS.incrementVoteRolePlayer(element.BestRolePlayer);}
      if(element.BestTAGPlayer!=null){
      this.votingS.incrementVoteTAGPlayer(element.BestTAGPlayer);}
      if(element.BestTTSpeaker!=null){
      this.votingS.incrementVoteTTSpeaker(element.BestTTSpeaker);}
   }

   public resetVoting()
   {
      this.votingS.setVotingStatus(false);
      this.votingS.getVoteDetails().subscribe(res=>{
      res.forEach(element => { 
        this.votingS.resetVoting(element.id);
      });
      });
    this.votingS.resetResults();
   }

}
