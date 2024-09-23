import { CommonModule} from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, TemplateRef, TrackByFunction, ViewChild} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { Pipe, PipeTransform } from '@angular/core';
import { HammerModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

@Pipe({ name: 'reverse' })

export class ReversePipe implements PipeTransform {
  transform(value: any[]) {
    return value.slice().reverse();
  }
}
@Component({
  selector: 'app-post-slider1',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, RouterModule, CommonModule, HammerModule, MatIconModule],
  templateUrl: './post-slider1.component.html',
  styleUrl: './post-slider1.component.scss'
})
export class PostSlider1Component implements OnInit, AfterViewInit{

  selectedIndex=0;
  sliceitem=5;
  showmore=true;
  showicon=true;

  changeslice(){
    this.sliceitem=this.sliceitem +5
    this.showicon=true;
  }

  showPrev(i: number){
          if(this.selectedIndex > 0){
            this.selectedIndex = i - 1;
          }

          if(this.selectedIndex === 0){
            this.PrevButtonVisible= false;
          }else{
            this.PrevButtonVisible = true;
          }

          if(this.selectedIndex === (this.postData?.length - 1)){
            this.NextButtonVisible= false;
          }else{
            this.NextButtonVisible = true;
          }
          if(this.selectedIndex === this.sliceitem){
            this.showicon=false;
          }else{
            this.showicon=true;
          }
  }

  showNext(i: number){
              if(this.selectedIndex < this.postData?.length - 1){
                this.selectedIndex = i + 1;
                console.log(i+1);
              }
          
              if(this.selectedIndex === 0){
                this.PrevButtonVisible= false;
              }else{
                this.PrevButtonVisible = true;
              }

              if(this.selectedIndex === (this.postData?.length - 1)){
                this.NextButtonVisible= false;
              }else{
                this.NextButtonVisible = true;
              }

              if(this.selectedIndex === this.sliceitem){
                this.showicon=false;
              }else{
                this.showicon=true;
              }

  }




  postData: any;
  readData:any;
  table: any = 'posts';
  showMore1 = false; // initial value in class
  showMore2 = false; // initial value in class
  PrevButtonVisible= false;
  NextButtonVisible= true;

  constructor(private apiservice:ApiService, private el:ElementRef, private router: Router) {
    this.ngOnInit();
         // override the route reuse strategy
         this.router.routeReuseStrategy.shouldReuseRoute = function(){
          return false;
       }
       this.router.events.subscribe((evt) => {
          if (evt instanceof NavigationEnd) {
             // trick the Router into believing it's last link wasn't previously loaded
             this.router.navigated = false;
             // if you need to scroll back to top
             window.scrollTo(0, 0);
          }
      });
  };
  

  ngOnInit(): void {
    this.getAllData();
  }

  ngAfterViewInit(): void {
    this.getAllData();
  }

  //get Data
  getAllData() 
  {
    this.apiservice.getAllData(this.table).subscribe((res)=>{
      //console.log(res,"res==>");
      this.readData = res.data;
      //const reader = new FileReader;
      //reader.onload = this.readData;
      //console.log(this.readData);
      this.postData = this.readData;
    });
  }


  onPrevClick(): void{
    var elm = this.el.nativeElement.children[0].children[0].children[0].children[0];
    var item = elm.getElementsByClassName("item");
    if(window.innerWidth < 640) {
            elm.prepend(item[item.length - 1]);
            if(document.getElementById('0') === item[0]){
              console.log('this.selectedIndex-->> FALSE')
              this.PrevButtonVisible= false;
            }else{
              console.log('this.selectedIndex-->> TRUE')
              this.PrevButtonVisible = true;
            }
        
            /*if(document.getElementById('showmore1') === item[0]){
              console.log('this.selectedIndex-->> FALSE')
              this.NextButtonVisible= false;
            }else{
              console.log('this.selectedIndex-->> TRUE')
              this.NextButtonVisible = true;
            }*/
    } 
    if(window.innerWidth < 960 && window.innerWidth > 640) {
            elm.prepend(item[item.length - 1]);
            if(document.getElementById('0') === item[0]){
              console.log('this.selectedIndex-->> FALSE')
              this.PrevButtonVisible= false;
            }else{
              console.log('this.selectedIndex-->> TRUE')
              this.PrevButtonVisible = true;
            }
        
            /*if(document.getElementById('showmore1') === item[0]){
              console.log('this.selectedIndex-->> FALSE')
              this.NextButtonVisible= false;
            }else{
              console.log('this.selectedIndex-->> TRUE')
              this.NextButtonVisible = true;
            }*/
    }
    if(window.innerWidth < 1280 && window.innerWidth > 960) {
            elm.prepend(item[item.length - 1]);
            if(document.getElementById('0') === item[0]){
              console.log('this.selectedIndex-->> FALSE')
              this.PrevButtonVisible= false;
            }else{
              console.log('this.selectedIndex-->> TRUE')
              this.PrevButtonVisible = true;
            }
        
           /* if(document.getElementById('showmore1') === item[0]){
              console.log('this.selectedIndex-->> FALSE')
              this.NextButtonVisible= false;
            }else{
              console.log('this.selectedIndex-->> TRUE')
              this.NextButtonVisible = true;
            }*/
    }  

  }

  onNextClick():void{
    var elm = this.el.nativeElement.children[0].children[0].children[0].children[0];
    var item = elm.getElementsByClassName("item");
    if(window.innerWidth < 640) {
            elm.append(item[0]);
            if(document.getElementById('0') === item[0]){
              console.log('this.selectedIndex-->> FALSE')
              this.PrevButtonVisible= false;
            }else{
              console.log('this.selectedIndex-->> TRUE')
              this.PrevButtonVisible = true;
            }

            /*if(document.getElementById('showmore1') === item[0]){
              console.log('this.selectedIndex-->> FALSE')
              this.NextButtonVisible= false;
            }else{
              console.log('this.selectedIndex-->> TRUE')
              this.NextButtonVisible = true;
            }*/
    }
    if(window.innerWidth < 960 && window.innerWidth > 640) {
            elm.append(item[0]);
            if(document.getElementById('0') === item[1]){
              console.log('this.selectedIndex-->> FALSE')
              this.PrevButtonVisible= false;
            }else{
              console.log('this.selectedIndex-->> TRUE')
              this.PrevButtonVisible = true;
            }

            /*if(document.getElementById('showmore1') === item[1]){
              console.log('this.selectedIndex-->> FALSE')
              this.NextButtonVisible= false;
            }else{
              console.log('this.selectedIndex-->> TRUE')
              this.NextButtonVisible = true;
            }*/
    }
    if(window.innerWidth < 1280 && window.innerWidth > 960) {
            elm.append(item[0]);
            if(document.getElementById('0') === item[1]){
              console.log('this.selectedIndex-->> FALSE')
              this.PrevButtonVisible= false;
            }else{
              console.log('this.selectedIndex-->> TRUE')
              this.PrevButtonVisible = true;
            }

            /*if(document.getElementById('showmore1') === item[2]){
              console.log('this.selectedIndex-->> FALSE')
              this.NextButtonVisible= false;
            }else{
              console.log('this.selectedIndex-->> TRUE')
              this.NextButtonVisible = true;
            }*/
    }
  }



  

}
