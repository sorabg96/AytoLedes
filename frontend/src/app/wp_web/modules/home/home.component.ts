import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FooterwComponent } from "../../shared/components/footerw/footerw.component";
import { CarouselComponent } from '../../shared/widgets/carousel/carousel.component';
import { PostSliderComponent } from "../../shared/widgets/post-slider/post-slider.component";
import { PostSlider1Component } from "../../shared/widgets/post-slider1/post-slider1.component";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [RouterModule, CommonModule, FooterwComponent, CarouselComponent, PostSliderComponent, PostSlider1Component]
})
export class HomeComponent{

      //IMAGES OF CARROUSEL
      images = [
        {
          imageSrc:
            './assets/header-home/ledesma-pueblo.jpg',
          imageAlt: 'Arco de Ledesma',
        },
        {
          imageSrc:
            './assets/header-home/ledesma-castillo.jpg',
          imageAlt: 'Castillo de Ledesma',
        },
        {
          imageSrc:
            './assets/header-home/ledesma-puente.jpg',
          imageAlt: 'Puente de Ledesma',
        },
      ]
}
