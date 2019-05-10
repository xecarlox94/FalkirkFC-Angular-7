import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../users/user-auth.service';


@Injectable({
    providedIn: "root"
})

export class UserAuthGuard implements CanActivate {
    userAuthService: UserAuthService

    constructor(userAuthSrv: UserAuthService){
        this.userAuthService = userAuthSrv;
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.userAuthService.isLoggedIn();
    }

    


}