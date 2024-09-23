import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule} from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ApiService } from '../../../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';


@Component({
    selector: 'app-headerw2',
    standalone: true,
    templateUrl: './headerw2.component.html',
    styleUrl: './headerw2.component.scss',
    imports: [ MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, FlexLayoutModule, HttpClientModule, CommonModule, MatDividerModule, RouterModule, MatSidenavModule, MatExpansionModule, MatListModule],
})
export class Headerw2Component implements OnInit{
  
  constructor(private apiservice: ApiService, private router:Router, private ren: Renderer2){
    this.ngOnInit();
  }

  //Api-list-conection Navegation

  table: any = 'municipal_services';
  MSData:any;
  table2: any = 'other_services';
  OSData:any;
  table3: any = 'associations';
  AData:any;
  table4: any = 'sports_areas';
  SAData:any;
  
  ngOnInit(): void {
    this.getDataMS();
    this.getDataOS();
    this.getDataA();  
    this.getDataSA();
  }

  ngAfterViewInit(): void {
    this.getDataMS();
    this.getDataOS();
    this.getDataA();  
    this.getDataSA();
  }

  //get Data
  getDataMS() 
  {
    this.apiservice.getAllData(this.table).subscribe((res)=>{
      //console.log(res,"res==>");
      this.MSData = res.data;
    });
  }

  getDataOS() 
  {
    this.apiservice.getAllData(this.table2).subscribe((res)=>{
      //console.log(res,"res==>");
      this.OSData = res.data;
    });
  }

  getDataA() 
  {
    this.apiservice.getAllData(this.table3).subscribe((res)=>{
      //console.log(res,"res==>");
      this.AData = res.data;
    });
  }

  getDataSA() 
  {
    this.apiservice.getAllData(this.table4).subscribe((res)=>{
      //console.log(res,"res==>");
      this.SAData = res.data;
    });
  }



  //Horizontal Navegator mouseover


  enteredButton = false;
  isMatMenuOpen = false;
  prevButtonTrigger: any;


  menuenter() {
    this.isMatMenuOpen = true;
  }

  menuLeave(trigger:any, button:any) {
    setTimeout(() => {
      if (!this.enteredButton) {
        this.isMatMenuOpen = false;
        trigger.closeMenu();
        //this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        //this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } else {
        this.isMatMenuOpen = false;
      }
    }, 80)
  }

  buttonEnter(trigger:any) {
    setTimeout(() => {
      if(this.prevButtonTrigger && this.prevButtonTrigger != trigger){
        this.prevButtonTrigger.closeMenu();
        this.prevButtonTrigger = trigger;
        this.isMatMenuOpen = false;
        trigger.openMenu();
        //this.ren.removeClass(trigger.menu.items.first['_elementRef'].nativeElement, 'cdk-focused');
        //this.ren.removeClass(trigger.menu.items.first['_elementRef'].nativeElement, 'cdk-program-focused');
      }
      else if (!this.isMatMenuOpen) {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger
        trigger.openMenu();
        //this.ren.removeClass(trigger.menu.items.first['_elementRef'].nativeElement, 'cdk-focused');
        //this.ren.removeClass(trigger.menu.items.first['_elementRef'].nativeElement, 'cdk-program-focused');
      }
      else {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger
      }
    })
  }

  buttonLeave(trigger:any, button:any) {
    setTimeout(() => {
      if (this.enteredButton && !this.isMatMenuOpen) {
        trigger.closeMenu();
        //this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        //this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } if (!this.isMatMenuOpen) {
        trigger.closeMenu();
        //this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        //this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } else {
        this.enteredButton = false;
      }
    }, 100)
  }
}
