import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticateService } from './services/authentication.service';
import { UserSettingService } from './services/UserSettingService';
import { exRoles } from './models/UserSetting.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate: any;
  development = false;
  released  = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticateService,
    private navCtrl: NavController
  ) {

    this.navigate = [
      {
        url: 'Agenda',
        title: 'Agenda',
        icon: 'document-attach-sharp',
        enabled: this.released
      },
      {
        url: 'voting',
        title: 'Voting',
        icon:'ribbon-sharp',
        enabled: this.released
      },
      {
        url: 'awards',
        title: 'Awards',
        icon: 'trophy-sharp',
        enabled: this.released
      },
      {
        url: 'TableTopics',
        title: 'Table Topics',
        icon: 'receipt-sharp',
        enabled: this.released
      },
      {
        url: 'attendance',
        title: 'Attendance',
        icon: 'hand-left-sharp',
        enabled: this.released
      },
      {
        url: 'education-session',
        title: 'Education Sessions',
        icon: 'school-sharp',
        enabled: this.released
      },
      {
        url: 'evaluation', 
        title: 'Evaluation',
        enabled: this.development
      },
  ];
    this.initializeApp();
  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
