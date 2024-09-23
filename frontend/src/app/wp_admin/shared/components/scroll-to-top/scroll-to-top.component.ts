import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss'
})
export class ScrollToTopComponent {

scrollToTop() {
    (function smoothscroll() {
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 8));
        }
    })();
}

  //LOGIN-LOGOUT

  loggedIn: boolean = false;


  constructor(private apiservice: ApiService, private router:Router){
    this.checkIfLoggedIn()
  }

  ngOnInit(): void{
    this.apiservice.refresh.subscribe(()=>{
      this.checkIfLoggedIn();
    });
  }

  checkIfLoggedIn(){
    const token = localStorage.getItem('token');
    
    if(token){
      this.loggedIn = true;
    }else{
      this.loggedIn = false;
    }
  }

}

