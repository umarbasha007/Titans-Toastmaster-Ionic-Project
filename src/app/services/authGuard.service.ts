import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthenticateService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private auth: AuthenticateService, private router: Router ) {
    }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
                    const auth = firebase.auth();
                    if (auth === undefined || auth === null) {
                        this.router.navigate(['login']);
                        return false;
                    }
                    const name = firebase.auth().currentUser;
                    if ( name === undefined || name === null)  {
                        this.router.navigate(['login']);
                        return false;
                    }
                    const uid = firebase.auth().currentUser.uid;
                    if ( uid === undefined || uid === null)  {
                        this.router.navigate(['login']);
                        return false;
                    }
                    return true; 
    }
}
