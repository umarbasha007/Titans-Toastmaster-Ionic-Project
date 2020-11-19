import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSetting, Club, exRoles } from '../../../../models/UserSetting.model';
import { UserSettingService } from "../../../../services/UserSettingService";

@Component({
  selector: 'app-table-topics',
  templateUrl: './table-topics.page.html',
  styleUrls: ['./table-topics.page.scss'],
})
export class TableTopicsPage implements OnInit {

  constructor(
    private route: Router,
    public userSettingS: UserSettingService,
    ) { }

  ngOnInit() {
  }

  public goToEnterTTAdmin(){
    this.route.navigate(['/table-topics-admin']);
  }

  public isExcom(){
    if(this.userSettingS.myClub === undefined) { return false; }
    return this.userSettingS.myClub.excomRole === exRoles.Vice_President_Education;
  }

}
