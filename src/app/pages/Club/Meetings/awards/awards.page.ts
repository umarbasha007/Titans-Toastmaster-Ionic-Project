import { Component, OnInit } from '@angular/core';
import { votingDetails, ResultsDetails } from '../../../../models/votingDetails';
import { VotingService } from '../../../../services/voting.service';
import { MeetingService } from '../../../../services/meeting.service';
import { UserListService } from '../../../../services/user-list.service';
import { EvaluatorDetails,Meeting } from '../../../../models/MeetingDetails';
import { exRoles } from '../../../../models/UserSetting.model';
import { UserSettingService } from '../../../../services/UserSettingService';
import { User } from '../../../../models/user';
import { WebDriver } from 'protractor';
import { ImageServiceService } from '../../../../services/image-service.service';
import { clubDetails } from '../../../../models/clubDetails';
@Component({
  selector: 'app-awards',
  templateUrl: './awards.page.html',
  styleUrls: ['./awards.page.scss'],
})
export class AwardsPage implements OnInit {
  public bestSpeakerList: ResultsDetails[];
  public bestSpeakerDetails: User;

  public bestEvaluatorList: ResultsDetails[];
  public bestEvaluatorDetails: User;

  public bestRolePlayerList: ResultsDetails[];
  public bestRolePlayerDetails: User;

  public bestTTList: ResultsDetails[];
  public bestTTDetails: User;

  public bestTAGList: ResultsDetails[];
  public bestTAGDetails: User;

  public meetingDetails: Meeting;
  public clubDetails: clubDetails;
  public president = '';
  public meetingDate = '';
  public bestSpeakerName ='';
  public closedVoting = false;
  public imgsrc_best_speaker ='assets/bestSpeaker.PNG';
  public imgsrc_best_evaluator ='assets/bestEvaluator.PNG';
  public imgsrc_best_role ='assets/bestRolePlayer.PNG';
  public imgsrc_best_tag ='assets/bestTAGPlayer.PNG';
  public imgsrc_best_tt ='assets/bestTT.PNG';
 public imgsrc= '';
 public himgsrc='';
  constructor(  
    public votingS: VotingService,
    public meetingS: MeetingService,
    public userS: UserListService,
    public imgS: ImageServiceService,
    public userSettingS: UserSettingService
    ) { 
    this.init();
  }

  ngOnInit() {
  }

  public isExcom(){
    if(this.userSettingS.myClub === undefined) { return false; }
    return this.userSettingS.myClub.excomRole === exRoles.Vice_President_Education;
  }

  public async updateSpeaker()
  {
  this.placeText('imgS1','bestSpeakerName','speakeraward' ,1183, 887,   500,  450,this.bestSpeakerDetails.displayName);
  this.placeText('imgS1','meetingDate','speakeraward' ,1183, 887,   500,  775,this.meetingDetails.MeetingTime);
  this.placeText('imgS1','president','speakeraward' ,1183, 887,   900,  775, this.clubDetails.president );

 /* let  url ='';
  await this.takescreenshot('svg_speaker','assets/BestSpeaker.PNG').then(urlStr=>{
    url= urlStr;
    console.log("in");
  });
  console.log("out"); 
  this.imgsrc = url;
  this.imgsrc_best_speaker = url;
  this.himgsrc =url;*/
  }

  public updateEvaluator()
  {
    this.placeText('imgS2','bestEvaluatorName','evaluatoraward' ,1183, 887,   500,  450, this.bestEvaluatorDetails.displayName);
    this.placeText('imgS2','meetingDate_2','evaluatoraward' ,1183, 887,   500,  775,this.meetingDetails.MeetingTime);
    this.placeText('imgS2','president_2','evaluatoraward' ,1183, 887,   900,  775, this.clubDetails.president );
    
  }

  public updateTT(){
    this.placeText('imgS3','bestTTName','ttaward' ,1183, 887,   500,  450, this.bestTTDetails.displayName);
    this.placeText('imgS3','meetingDate_3','ttaward' ,1183, 887,   500,  775, this.meetingDetails.MeetingTime);
    this.placeText('imgS3','president_3','ttaward' ,1183, 887,   900,  775, this.clubDetails.president );
  
  }

  public updateRolePlayer(){
    this.placeText('imgS4','bestRolePlayer','roleplayeraward' ,1183, 887,   500,  450, this.bestRolePlayerDetails.displayName);
    this.placeText('imgS4','meetingDate_4','roleplayeraward' ,1183, 887,   500,  775, this.meetingDetails.MeetingTime);
    this.placeText('imgS4','president_4','roleplayeraward' ,1183, 887,   900,  775, this.clubDetails.president );
    
  }

  public updateTAGPlayer(){
    this.placeText('imgS5','bestTAGPlayer','tagplayeraward' ,1183, 887,   500,  450, this.bestTAGDetails.displayName);    
    this.placeText('imgS5','meetingDate_5','tagplayeraward' ,1183, 887,   500,  775, this.meetingDetails.MeetingTime);
    this.placeText('imgS5','president_5','tagplayeraward' ,1183, 887,   900,  775, this.clubDetails.president );
      
  }

  public placeText(parentImage,svgtext,svg,orginalWidth,orginalHeight,locx,locy,text){

    const parentElement = document.getElementById(parentImage);
    const svgText = document.getElementById(svgtext);
    const svgElem = document.getElementById(svg);

    const parentWidth =  parentElement.clientWidth;
    const parentHeight = parentElement.clientHeight;
    const locRatiox = locx / orginalWidth;
    const locRatioy = locy / orginalHeight;
    const newLocx = locRatiox * parentWidth;
    const newLocy = locRatioy * parentHeight;


    const shiftx = -svgElem.getBoundingClientRect().x + parentElement.getBoundingClientRect().x;
    const shifty = -svgElem.getBoundingClientRect().y + parentElement.getBoundingClientRect().y;

    svgText.setAttribute('x', '' + (newLocx + shiftx)) ;
    svgText.setAttribute('y', '' + (newLocy + shifty));
    console.log(shiftx);
    //svgText.setAttribute('x', '' + (locx )) ;
    //svgText.setAttribute('y', '' + (locy ));
    svgText.innerHTML = text;

  }

  public init()
  {
    
    
    this.meetingDetails = {} as Meeting;
    this.meetingS.getMeetingDetails().subscribe(res=> {
      this.meetingDetails = res;
    });

    this.clubDetails = {} as clubDetails;
    this.meetingS.getClubDetails().subscribe(res=>{
      this.clubDetails = res;
    });

    this.votingS.getSpeakerResultsList().subscribe(res=>{
      this.bestSpeakerList = res.sort((a, b) => (a.voteCount < b.voteCount) ? 1 : -1).slice(0,1);
      this.userS.getUsername(this.bestSpeakerList.pop().id).subscribe(res=> {
        this.bestSpeakerDetails = res;
         });
    });

    this.votingS.getEvaluatorResultsList().subscribe(res=>{
      this.bestEvaluatorList = res.sort((a, b) => (a.voteCount < b.voteCount) ? 1 : -1).slice(0,1);
      this.userS.getUsername(this.bestEvaluatorList.pop().id).subscribe(res=> {
        this.bestEvaluatorDetails = res;
         });
    });
    
    this.votingS.getTTResultsList().subscribe(res=>{
      this.bestTTList = res.sort((a, b) => (a.voteCount < b.voteCount) ? 1 : -1).slice(0,1);
      this.userS.getUsername(this.bestTTList.pop().id).subscribe(res=> {
        this.bestTTDetails = res;
         });
    });

    this.votingS.getRolePlayerResultsList().subscribe(res=>{
      this.bestRolePlayerList = res.sort((a, b) => (a.voteCount < b.voteCount) ? 1 : -1).slice(0,1);
      this.userS.getUsername(this.bestRolePlayerList.pop().id).subscribe(res=> {
        this.bestRolePlayerDetails = res;
         });
    });
    
    this.votingS.getTAGResultsList().subscribe(res=>{
      this.bestTAGList = res.sort((a, b) => (a.voteCount < b.voteCount) ? 1 : -1).slice(0,1);
      this.userS.getUsername(this.bestTAGList.pop().id).subscribe(res=> {
        this.bestTAGDetails = res;
         });
    });
  }

  public publishResults(){
    this.updateSpeaker();
    this.updateEvaluator();
    this.updateTT();
    this.updateRolePlayer();
    this.updateTAGPlayer();
   }

   public resultsbackup(){
     this.votingS.resultsBackup(this.bestSpeakerDetails,this.bestEvaluatorDetails,this.bestTTDetails,this.bestRolePlayerDetails,this.bestTAGDetails,this.meetingDetails);
   }

   

public async takescreenshot(svgStr,templateUrl){
  return new Promise<any>((resolve, reject) => {
  const svgString = new XMLSerializer().serializeToString(document.getElementById(svgStr));
  const canvas: any = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const DOMURL: any = self.URL || self.webkitURL || self;
  const img = new Image();
  const svg = new Blob([svgString], {
    type: 'image/svg+xml;charset=utf-8'
  });
  const url = DOMURL.createObjectURL(svg);
  const img1 = new Image();
  const that=this;
  img1.onload = function() {
    canvas.width = img1.width;
    canvas.height = img1.height;
    img.src = url;

  };
  img.onload = function() {
    ctx.globalAlpha = 1.0;
    ctx.drawImage(img1, 0, 0);
    ctx.globalAlpha = 0.5; 
    ctx.drawImage(img, 0, 0);
    const png = canvas.toDataURL('image/png');
    //document.querySelector('#png-container').innerHTML = '<img src="' + png + '"/>';
    const imgelement:any =document.getElementById('imgS1');
    //imgelement.src = png;
    canvas.toBlob(function(blob){
      that.imgS.uploadToStorage(blob,'bestspeaker.png').then(url1=>{
        console.log(url1);
        //that.imgsrc = url1;
        // $scope.$digest();
        resolve(url1);
      });
    }, 'image/png', 0.95);
    DOMURL.revokeObjectURL(png);

  };
  img1.crossOrigin = 'Anonymous';
  img1.src = templateUrl;
});
};

}
