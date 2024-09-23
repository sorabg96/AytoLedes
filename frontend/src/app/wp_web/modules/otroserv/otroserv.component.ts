import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { FooterwComponent } from "../../shared/components/footerw/footerw.component";
import { isPlatformBrowser} from '@angular/common';


@Component({
    selector: 'app-otroserv',
    standalone: true,
    templateUrl: './otroserv.component.html',
    styleUrl: './otroserv.component.scss',
    imports: [CommonModule, HttpClientModule, MatCardModule, MatIconModule, FooterwComponent]
})
export class OtroservComponent implements OnInit{
  idtext: any;
  constructor(private apiservice: ApiService, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object){
    this.getDataOS();
  }

  //Api-list-conection Navegation

  table: any = 'other_services';
  OSData:any;
  value: any;

  ngOnInit(): void {
    this.getDataOS();
    this.route.fragment.subscribe(fragment => {
      this.value = fragment; 
      setTimeout(() => { 
        try {
          this.jumpToS(this.value)
        } catch (e) {
        }
      });
    });
    setTimeout(() => {
        for (let index = 0; index < this.OSData.length; index++) {
          const element = '#text_des' + index;
            if (isPlatformBrowser(this.platformId)) {
              // Client only code.
              this.detectURLInText(element)
            }
      }
    }, 100);
  }

  ngAfterViewInit(): void {
    this.getDataOS();
    setTimeout(() => { 
      try {
        this.jumpToD(this.value)
      } catch (e) {}
    },20);
  }

      //get Data
            getDataOS() 
            {
              this.apiservice.getAllData(this.table).subscribe((res)=>{
                //console.log(res,"res==>");
                this.OSData = res.data;
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
                  //URLs starting with http://, https://, or ftp://
                  const replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
                  elem.innerHTML = elem.innerHTML.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

                  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
                  const replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
                  elem.innerHTML = elem.innerHTML.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

                  //Change email addresses to mailto:: links.
                  const replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
                  elem.innerHTML = elem.innerHTML.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

                  //Change movil number to tel:: links.
                  const replacePattern4 = /(\b((([0-9 ]{1})+(\s*)){9})+)/gim;
                  elem.innerHTML = elem.innerHTML.replace(replacePattern4, '<a href="tel:+34$1">$1</a>');

              return elem;
            }
}
