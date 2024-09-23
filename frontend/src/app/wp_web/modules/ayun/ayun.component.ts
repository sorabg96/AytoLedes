import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { FooterwComponent } from "../../shared/components/footerw/footerw.component";

@Component({
    selector: 'app-ayun',
    standalone: true,
    templateUrl: './ayun.component.html',
    styleUrl: './ayun.component.scss',
    imports: [CommonModule, MatDividerModule, MatIconModule, FooterwComponent]
})
export class AyunComponent implements OnInit{
  constructor(private apiservice: ApiService, private route: ActivatedRoute){
    this.getDataG();
    this.getDataMC();
    this.getDataPP();
  }

  //Api-list-conection Navegation

  table: any = 'greetings';
  table2: any = 'politicalparty';
  table3: any = 'municipal_corporation';
  gData:any;
  ppData:any;
  mcData:any;
  value: any;
  
  ngOnInit(): void {
    this.getDataG();
    this.getDataMC();
    this.getDataPP();
    this.route.fragment.subscribe(fragment => {
      this.value = fragment; 
      setTimeout(() => { 
        try {
          this.jumpToS(this.value)
        } catch (e) {
        }
      });
    });
  }

  ngAfterViewInit(): void {
    this.getDataG();
    this.getDataMC();
    this.getDataPP();
    setTimeout(() => { 
      try {
        this.jumpToD(this.value)
      } catch (e) {}
    },20);
  }

      //get Data greetings
            getDataG() 
            {
              this.apiservice.getAllData(this.table).subscribe((res)=>{
                //console.log(res,"res==>");
                this.gData = res.data;
              });
            }

      //get Data political party
            getDataPP() 
            {
              this.apiservice.getAllData(this.table2).subscribe((res)=>{
                //console.log(res,"res==>");
                this.ppData = res.data;
              });
            }
  
      //get Data Municipal Corporation
            getDataMC() 
            {
              this.apiservice.getAllData(this.table3).subscribe((res)=>{
                //console.log(res,"res==>");
                this.mcData = res.data;
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
}
