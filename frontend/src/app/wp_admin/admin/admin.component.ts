import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ApiService } from '../../services/api.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
    imports: [RouterModule, HeaderComponent, FooterComponent, SidebarComponent, MatSidenavModule]
})
export class AdminComponent implements OnInit{

  sideBarOpen = false;

  sideBarToggler($event: any) {
    this.sideBarOpen = !this.sideBarOpen;
  }

  constructor(private apiservice: ApiService, private cookieService : CookieService){
    this.checkIfLoggedIn()
  }
  ngOnInit(): void{
    this.apiservice.refresh.subscribe(()=>{
      this.checkIfLoggedIn();
    });
  }
  checkIfLoggedIn(){
    const token = this.cookieService.get("login");
    if(!token){
      this.sideBarOpen= false;
    }
  }
}
