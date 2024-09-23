import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FooterwComponent } from "../../shared/components/footerw/footerw.component";
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-asoc',
    standalone: true,
    templateUrl: './asoc.component.html',
    styleUrl: './asoc.component.scss',
    imports: [CommonModule, HttpClientModule, MatCardModule, MatIconModule, FooterwComponent]
})
export class AsocComponent implements OnInit{
  constructor(private apiservice: ApiService, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object){
    this.getDataA();
  }

  //Api-list-conection Navegation

  table: any = 'associations';
  AData:any;
  value: any;
  
  ngOnInit(): void { 
    this.getDataA();
    this.route.fragment.subscribe(fragment => {
      this.value = fragment; 
      setTimeout(() => { 
        try {
          this.jumpToS(this.value)
        } catch (e) {}
      });
    });
    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        // Client only code.
        this.detectURLInText('#text_des');
      }
}, 100); 
  }

  ngAfterViewInit(): void {
    this.getDataA();
    setTimeout(() => { 
      try {
        this.jumpToD(this.value)
      } catch (e) {}
    },20);
  }

        //get Data
        getDataA() 
        {
              this.apiservice.getAllData(this.table).subscribe((res)=>{
                //console.log(res,"res==>");
                this.AData = res.data;
              });
        }

        //jump to fragment directly
              jumpToD(section: string){
                document.getElementById(section)?.scrollIntoView();
              }
  
        //jump to fragment smooyhy
              jumpToS(section: string){
                document.getElementById(section)?.scrollIntoView({behavior:'smooth'});
              }

        //detect url
              detectURLInText( contentElement: any ) {
                const elem = document.querySelector(contentElement);
                    elem.innerHTML = elem.innerHTML.replace(/(https?:\/\/[^\s]+)/g, `<a class='link' href="$1">$1</a>`);
                return elem;
              }
}
