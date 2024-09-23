import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private apiService : ApiService, private router: Router) {}

  canActivate(): boolean {

    this.apiService.profilelogin().subscribe((res:any)=>{
      this.authService.isLoggedIn = true;
    },
    (error: any)=>{
      this.authService.isLoggedIn = false;
    });
    if (this.authService.isLoggedIn) {
      return true;
    }else{
      return false;
    }
  }
}

