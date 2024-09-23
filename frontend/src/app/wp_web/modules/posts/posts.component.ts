import {Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { FooterwComponent } from "../../shared/components/footerw/footerw.component";
import { PostSliderComponent } from "../../shared/widgets/post-slider/post-slider.component";
import { PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ImageModalComponent } from '../../shared/widgets/image-modal/image-modal.component';
import { FormsModule } from '@angular/forms';
import { Dialog, DialogModule } from '@angular/cdk/dialog';

export interface ImageData {
  imgSrcEnlarge: string;
}

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [FooterwComponent, PostSliderComponent, RouterModule, MatIconModule, CommonModule, FormsModule, DialogModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit{





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






  description: any;
  postname: any;
  table: any = 'posts';
  getparamid: any;
  imgURL: any;  
  imgsURL:any=[];
  imgs: any;
  pdf: any;
  pdfURL: any=[];
  readData: any;
  postAfterID: any;
  postBeforeID: any;
  postBeforeNAME: any;
  postAfterNAME: any;
  previous: boolean= true;
  next: boolean= true;
  isDescript: boolean;

  constructor(private service:ApiService,private router2: Router, private router:ActivatedRoute,@Inject(PLATFORM_ID) private platformId: Object){}

  ngOnInit(): void {

         //console.log(this.router.snapshot.paramMap.get('id'),'getid');
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid){
      this.service.getSingleData(this.table,this.getparamid).subscribe((res)=>{
          this.postname = res.data[0].postname;
          this.description = res.data[0].description;
          this.imgURL ='http://localhost:3000/'+res.data[0].image;
          if( res.data[0].images ){
              this.imgs = (res.data[0].images).split(',');
              for (let i = 0; i < this.imgs.length; i++) {
                  this.imgsURL.push({"imgSrc":'http://localhost:3000/' + this.imgs[i]});
                  console.log(this.imgsURL)
              }
          }

        if( res.data[0].pdf ){
          this.pdf = (res.data[0].pdf).split(',');
          for (let i = 0; i < this.pdf.length; i++) {
            const reg = /.*(\/)/g;
            this.pdfURL.push({"name": this.pdf[i].replace(reg,''), "value":'http://localhost:3000/' + this.pdf[i]});
          }
      }

      });
      
    }
    setTimeout(() => {
        const element = '#text_des';
          if (isPlatformBrowser(this.platformId)) {
            // Client only code.
            this.detectURLInText(element)
          }
    }, 100);

    this.getAllData();

    if(this.description){
      this.isDescript=true;
    }else{
      this.isDescript=false;      
    }
  }


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
  

  getAllData() 
  {
    this.service.getAllData(this.table).subscribe((res)=>{
      //console.log(res,"res==>");
      this.readData = res.data;

      for (let index = 0; index < this.readData.length; index++) {
        const element = this.readData[index];
        if(element.id == this.getparamid){
          if(index == 0){
            this.next=false;
          }else{
            this.next=true;
            this.postAfterID = this.readData[index-1].id;
            this.postAfterNAME = this.readData[index-1].postname;
            console.log('postAfterNAME',this.postAfterNAME.length)
          }
          if(index == (this.readData.length-1)){
            this.previous=false;
          }else{
            this.previous=true;
            this.postBeforeID = this.readData[index+1].id;
            this.postBeforeNAME = this.readData[index+1].postname;
          }
        }
      }


    });
  }
  NavigatepostBefore(){
    this.router2.navigate(['/noticias',this.postBeforeID], {skipLocationChange: true}).then(() => {
      this.router2.navigate([this.router2.url]);
    });
  }

  NavigatepostAfter(){
    this.router2.navigate(['/noticias',this.postAfterID], {skipLocationChange: true}).then(() => {
      this.router2.navigate([this.router2.url]);

    });
  }
}
