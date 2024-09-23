import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

interface carouselImage {
  imageSrc: string;
  imageAlt: string;
}


@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit{

  @Input() images: carouselImage[] = []
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 5000; //Default to 5 seconds
  isBrowser = signal(false);  // a signal to store if platform is browser

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser.set(isPlatformBrowser(platformId));  // save isPlatformBrowser in signal
  }
  selectedIndex = 0;

  ngOnInit(): void { 
    if(this.isBrowser()) {
    if(this.autoSlide){
      this.autoSlideImages();
    }
  }
  }

  // Changes slide in every 5 seconds
  autoSlideImages(): void {
    setInterval(() => {
      this.onNextClick();
    },this.slideInterval);
  }

  // sets index of image on dot/indicator click
  selectImage(index: number): void{
    this.selectedIndex = index;
  }


  onPrevClick(): void{
    if(this.selectedIndex === 0){
      this.selectedIndex = this.images.length -1;
    }else{
      this.selectedIndex--;
    }
  }

  onNextClick():void{
    if(this.selectedIndex === this.images.length -1){
      this.selectedIndex = 0;
    }else{
      this.selectedIndex++;
    }
  }
}
