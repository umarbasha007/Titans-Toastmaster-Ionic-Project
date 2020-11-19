// app-routing.module.ts

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import {AuthGuardService} from 'src/app/services/authGuard.service'
const redirectUnauthorizedToLanding = redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule),
    canActivate : [AngularFireAuthGuard]
  },
  {
    path: 'Agenda',
    loadChildren: () => import('./pages/Club/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'admin-settings',
    loadChildren: () => import('./pages/Club/Meetings/admin-settings/admin-settings.module').then( m => m.AdminSettingsPageModule)
  },
  {
    path: 'edit-speaker',
    loadChildren: () => import('./pages/Club/Meetings/edit-speaker/edit-speaker.module').then( m => m.EditSpeakerPageModule)
  },
  {
    path: 'edit-tmod',
    loadChildren: () => import('./pages/Club/Meetings/edit-tmod/edit-tmod.module').then( m => m.EditTmodPageModule)
  },
  {
    path: 'edit-wod',
    loadChildren: () => import('./pages/Club/Meetings/edit-wod/edit-wod.module').then( m => m.EditWodPageModule)
  },
  {

    path: 'timer-page',
    loadChildren: () => import('./pages/Club/Meetings/timer-page/timer-page.module').then( m => m.TimerPagePageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'TableTopics',
    loadChildren: () => import('./pages/Club/Meetings/pie-chart/pie-chart.module').then( m => m.PieChartPageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'enter-tt-speaker',
    loadChildren: () => import('./pages/Club/Meetings/enter-tt-speaker/enter-tt-speaker-routing.module')
    .then( m => m.EnterTtSpeakerPageRoutingModule)
  },
  {
    path: 'voting',
    loadChildren: () => import('./pages/Club/Meetings/voting/voting.module').then( m => m.VotingPageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'awards',
    loadChildren: () => import('./pages/Club/Meetings/awards/awards.module').then( m => m.AwardsPageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'evaluation',
    loadChildren: () => import('./pages/Club/Meetings/evaluation/evaluation.module').then( m => m.EvaluationPageModule)
  },
  {
    path: 'table-topics',
    loadChildren: () => import('./pages/Club/Meetings/table-topics/table-topics.module').then( m => m.TableTopicsPageModule)
  },
  {
    path: 'table-topics-admin',
    loadChildren: () => import('./pages/Club/Meetings/table-topics-admin/table-topics-admin.module')
    .then( m => m.TableTopicsAdminPageModule)
  },
  {
    path: 'popovercomponent',
    loadChildren: () => import('./pages/Club/Meetings/popovercomponent/popovercomponent.module').then( m => m.PopovercomponentPageModule)
  },
  {
    path: 'assign-evaluator',
    loadChildren: () => import('./pages/Club/Meetings/assign-evaluator/assign-evaluator.module').then( m => m.AssignEvaluatorPageModule)
  },
  {
    path: 'screenshot',
    loadChildren: () => import('./experiment/screenshot/screenshot.module').then( m => m.ScreenshotPageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./pages/Club/Meetings/attendance/attendance.module').then( m => m.AttendancePageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'education-session',
    loadChildren: () => import('./pages/Club/Meetings/education-session/education-session.module').then( m => m.EducationSessionPageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'enter-education-session',
    loadChildren: () => import('./pages/Club/Meetings/enter-education-session/enter-education-session.module').then( m => m.EnterEducationSessionPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
