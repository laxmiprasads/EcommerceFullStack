import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{

  constructor(private router: Router,private userService: UserService,) {}
  canActivate():boolean{
    if (typeof window === 'undefined') {

      this.router.navigate(['']);
    return false;
  }
    const role = this.userService.getRole();
    if( typeof window !== 'undefined' && role){
      return true;
    }
    else{
      this.router.navigate(['']);
      return false;
    }
  }
};
