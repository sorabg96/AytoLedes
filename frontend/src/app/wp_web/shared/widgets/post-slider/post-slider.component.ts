import { CommonModule} from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Input, inject, OnInit, TemplateRef, TrackByFunction, ViewChild} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { Pipe, PipeTransform } from '@angular/core';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { Dialog } from '@angular/cdk/dialog';

@Pipe({ name: 'reverse' })

export class ReversePipe implements PipeTransform {
  transform(value: any[]) {
    return value.slice().reverse();
  }
}

export interface Slide{
  imgSrc:string;
}

export interface ImageData {
  imgSrcEnlarge: string;
}

@Component({
  selector: 'app-post-slider',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, RouterModule, CommonModule],
  templateUrl: './post-slider.component.html',
  styleUrl: './post-slider.component.scss'
})
export class PostSliderComponent implements OnInit, AfterViewInit{
  @Input() images:Slide[]=[];
  @Input() IsDescript:boolean;
  singleImage:boolean=false;
  doubleImage:boolean=false;


  constructor(private apiservice:ApiService, private el:ElementRef, private router: Router) {
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
    
        if(this.images.length==1){
          this.singleImage=true;
          console.log('Una imagen:',this.singleImage);
        }else{
          this.singleImage=false;
        }
        if(this.images.length==2){
          this.doubleImage=true;
          console.log('2images:',this.doubleImage);
        }else{
          this.doubleImage=false;
        }
    
  }

  ngAfterViewInit(): void {
  }

  dialog = inject(Dialog);
  openImage(imgSrcEnlarge:any): void {
    let top = window.pageYOffset;
    console.log(top,'distancia<<<')
    if(top < 1){
      window.scroll({ 
        top: 60
      });
    }
    const dialogRef = this.dialog.open<string>(ImageModalComponent, {
      width: '100%',
      height: '100%',
      data: imgSrcEnlarge,
    });
  }


  onPrevClick(): void{
    var elm = this.el.nativeElement.children[0].children[0].children[0].children[0];
    var item = elm.getElementsByClassName("item");
          elm.prepend(item[item.length - 1]);

  }

  onNextClick():void{
    var elm = this.el.nativeElement.children[0].children[0].children[0].children[0];
    var item = elm.getElementsByClassName("item");
          elm.append(item[0]);
  }
}
