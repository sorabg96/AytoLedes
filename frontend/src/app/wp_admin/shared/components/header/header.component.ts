import { Component, OnInit } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule} from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import {Output, EventEmitter} from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../../../../services/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,MatButtonModule,MatMenuModule,FlexLayoutModule, HttpClientModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  //SIDENAV

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  
  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  //LOGIN-LOGOUT

  loggedIn: boolean = false;
  


  constructor(public AuthService : AuthenticationService ,private apiservice: ApiService, private router:Router, private cookieService : CookieService){
    this.checkIfLoggedIn()
  }

  ngOnInit(): void{
    this.apiservice.refresh.subscribe(()=>{
      this.checkIfLoggedIn();
    });
  }

  checkIfLoggedIn(){
    this.loggedIn = this.AuthService.isLoggedIn;
  }

  logout(): void{    
    this.AuthService.isLoggedIn = false;
    this.apiservice.logout().subscribe((res:any)=>{
    });
    this.router.navigateByUrl('[/]', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/wp_admin/login']);
    });

  }
}
