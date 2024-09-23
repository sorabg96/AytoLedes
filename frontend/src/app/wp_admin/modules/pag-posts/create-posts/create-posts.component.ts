import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, InMemoryScrollingOptions, RouterConfigOptions, RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { CommonModule} from '@angular/common';
import { ApiService } from '../../../../services/api.service';
import { MatCardModule } from '@angular/material/card';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ScrollToTopComponent } from "../../../shared/components/scroll-to-top/scroll-to-top.component";
import { equal } from 'node:assert';




@Component({
    selector: 'app-create-posts',
    standalone: true,
    providers: [ApiService],
    templateUrl: './create-posts.component.html',
    styleUrl: './create-posts.component.scss',
    imports: [MaterialFileInputModule, CommonModule, MatButton, MatCardModule, MatIcon, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, HttpClientModule, ScrollToTopComponent]
})
export class CreatePostsComponent implements OnInit{
private _blank: any;
  
  


    
  constructor(private service:ApiService, private router:ActivatedRoute){  }
  
  table: any = 'posts';
  getparamid: any;
  images: any= [];
  pdf: any= [];
  image = "";
  imgURL = "assets/No_Image_Available.jpg";  
  //imgsURL: any = ['assets/No_Image_Available.jpg']; 
  imgsURL: any = []; 
  pdfURL: any = [];
  changedImage!: boolean | false;
  changedImages!: boolean | false;
  changedpdf!: boolean | false;
  imgsUpdate: any;
  pdfUpdate: any;
  OrigImgsURL: any = []; 
  OrigpdfURL: any = []; 
  imagesArray: any = [];
  

  ngOnInit(): void {
    //console.log(this.router.snapshot.paramMap.get('id'),'getid');
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid){
      this.service.getSingleData(this.table,this.getparamid).subscribe((res)=>{
          console.log(res,'res==>');
          this.postForm.patchValue({
              postname:res.data[0].postname,
              image:res.data[0].image,
              description:res.data[0].description,
              images:res.data[0].images,
              pdf:res.data[0].pdf
          });
          
          this.imgURL ='http://localhost:3000/' + res.data[0].image;
          if( res.data[0].images ){
              this.imgsUpdate = (res.data[0].images).split(',');
              for (let i = 0; i < this.imgsUpdate.length; i++) {
                this.imgsURL.push('http://localhost:3000/' + this.imgsUpdate[i]);
                this.OrigImgsURL.push('http://localhost:3000/' + this.imgsUpdate[i]);
                this.images.push('http://localhost:3000/' + this.imgsUpdate[i]);
              }
          }

          if( res.data[0].pdf ){
              this.pdfUpdate = (res.data[0].pdf).split(',');
              for (let i = 0; i < this.pdfUpdate.length; i++) {
                const reg = /.*(\/)/g;
                this.pdfURL.push({"name": this.pdfUpdate[i].replace(reg,''), "value":'http://localhost:3000/' + this.pdfUpdate[i]});
                this.OrigpdfURL.push('http://localhost:3000/' + this.pdfUpdate[i]);
                this.pdf.push('http://localhost:3000/' + this.pdfUpdate[i]);
              }
          }

      });
    }
  }

  //IMAGE FRONT PAGE
            selectImage(event: any){
              //console.log(event);
              //const file = event.target.files[0];
              //console.log(file);
              if(event.target.files.length>0)
              {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload  = (event:any) =>{
                  this.imgURL = event.target.result;
                }
                this.image = file;
                this.changedImage = true; 
                console.log(this.image, 'imagenes recogidas de portada-->>>');
                console.log(this.imgURL, 'imagenes recogidas de portada URL leer-->>>') 
              }
            }

            noimage():void{
              this.imgURL = "assets/No_Image_Available.jpg"; 
            }

    //MULTIPLE IMAGES SUPPORT PAGE
            selectMultipleImage(event: any){

              if(event.target.files.length>0)
              {
                for( var i = 0; i < event.target.files.length; i++){
                  var reader = new FileReader()
                  const files = event.target.files[i];
                  reader.readAsDataURL(files)
                  reader.onload  = (event:any) =>{
                    this.imgsURL.push(event.target.result);
                    //if(this.imgsURL.length>1 && !(this.imgsURL.indexOf("assets/No_Image_Available.jpg") === -1)){
                    //    const index = this.imgsURL.indexOf("assets/No_Image_Available.jpg");
                    //    this.imgsURL.splice(index, 1);
                    //}
                  }
                  this.images.push(files);
                }
                this.changedImages = true;
                //console.log(this.images,'1-imagenes almacenadas de soporte actualmente-->')
                //console.log(this.imgsURL,'1-imagenes almacenadas en url-->')
              }
            }

            noimages():void{
              //this.imgsURL= ["assets/No_Image_Available.jpg"];
              this.imgsURL= [];
              this.images= []; 
            }

          //Delete a specific image
          deleteimage(dataURL: any){
            const index = this.imgsURL.indexOf(dataURL);
            this.imgsURL.splice(index, 1);
            //if(this.imgsURL.length === 0){
            //  this.imgsURL= ["assets/No_Image_Available.jpg"];
            //}
            const index2 = this.images.indexOf(dataURL);
            this.images.splice(index2, 1);
            this.changedImages = true;
          }

          //Move element of array to the left
          movetoleft(dataURL: any){
            const fromindex = this.imgsURL.indexOf(dataURL);
            this.imgsURL.splice(fromindex, 1);
            let toindex = fromindex - 1;
            this.imgsURL.splice(toindex, 0, dataURL);

            let element = this.images[fromindex];
            this.images.splice(fromindex, 1);
            this.images.splice(toindex, 0, element);
            this.changedImages = true;
            //console.log(this.images,'2-imagenes almacenadas de soporte actualmente-->') 
            //console.log(this.imgsURL,'2-imagenes almacenadas en url-->')
          }


          //Move element of array to the right
          movetoright(dataURL: any){
            const fromindex = this.imgsURL.indexOf(dataURL);
            this.imgsURL.splice(fromindex, 1);
            let toindex = fromindex + 1;
            this.imgsURL.splice(toindex, 0, dataURL);

            let element = this.images[fromindex];
            this.images.splice(fromindex, 1);
            this.images.splice(toindex, 0, element);
            this.changedImages = true;
            //console.log(this.images,'2-imagenes almacenadas de soporte actualmente-->') 
            //console.log(this.imgsURL,'2-imagenes almacenadas en url-->')
          }





    //PDF
          selectMultiplePdf(event: any){

            if(event.target.files.length>0)
            {
              for( var i = 0; i < event.target.files.length; i++){
                var reader = new FileReader()
                const files = event.target.files[i];
                reader.readAsDataURL(files)
                reader.onload  = (event:any) =>{
                  this.pdfURL.push({"name": files.name, "value":event.target.result});
                }
                this.pdf.push(files);
              }
              console.log(this.pdfURL,'ARRAY PDF URL-->');
              console.log(this.pdf,'ARRAY PDF-->');
              this.changedpdf = true;

            }
          }

          nopdf():void{
            this.pdfURL= [];
            this.pdf= []; 
          }

        //Delete a specific pdf
        deletepdf(dataURL: any){
          const index = this.pdfURL.indexOf(dataURL);
          this.pdfURL.splice(index, 1);
          const index2 = this.pdf.indexOf(dataURL);
          this.pdf.splice(index2, 1);
          this.changedpdf = true;
        }

        //Move element of array to the left
        movetoleftpdf(dataURL: any){
          const fromindex = this.pdfURL.indexOf(dataURL);
          this.pdfURL.splice(fromindex, 1);
          let toindex = fromindex - 1;
          this.pdfURL.splice(toindex, 0, dataURL);

          let element = this.pdf[fromindex];
          this.pdf.splice(fromindex, 1);
          this.pdf.splice(toindex, 0, element);
          this.changedpdf = true;
        }


        //Move element of array to the right
        movetorightpdf(dataURL: any){
          const fromindex = this.pdfURL.indexOf(dataURL);
          this.pdfURL.splice(fromindex, 1);
          let toindex = fromindex + 1;
          this.pdfURL.splice(toindex, 0, dataURL);

          let element = this.pdf[fromindex];
          this.pdf.splice(fromindex, 1);
          this.pdf.splice(toindex, 0, element);
          this.changedpdf = true;
        }


  //Validators

  postnameFormControl = new FormControl('', [Validators.required]);
  imageFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('');
  imagesFormControl = new FormControl('');
  pdfFormControl = new FormControl('');
  
  //FormGroup for validators

  postForm = new FormGroup({
    postname : this.postnameFormControl,
    image: this.imageFormControl,
    description: this.descriptionFormControl,
    images: this.imagesFormControl,
    pdf:this.pdfFormControl
  });

  //Create post and show message
    errormsg: string | undefined;
    successmsg: string | undefined;

  postSubmit() {
       if (this.postForm.valid)
      {
        //console.log(this.postForm.value)

        const formData: any = new FormData();
        formData.append('postname', this.postForm.get('postname')?.value);
        formData.append('description', this.postForm.get('description')?.value);
        formData.append('images',this.image);
        for(let img of this.images){
            formData.append('images',img);
        };
        for(let log of this.pdf){
          formData.append('images',log);
        };
        
        
        this.service.createData(this.table,formData).subscribe((res)=>{
          //console.log(res,'res CreateData==>');
          
          this.imgURL = "assets/No_Image_Available.jpg";
          this.errormsg = undefined;
          this.imgsURL= [];
          this.pdfURL= [];
          this.successmsg = res.message;
            setTimeout(() => 
            {
              this.successmsg = undefined;
            },
            5000);  
        },
        (err)=>{
          for (const value of formData.values()) {
            console.log(value, 'error en service->');
          }

        }
        );
      }else
      {
        //console.log('Rellena todos los campos con sus respectivos valores')
        this.successmsg = undefined;
        this.errormsg = 'ERROR: No se han rellenado todos los datos';
            setTimeout(() => 
            {
               this.errormsg = undefined;
            },
            3000);
      }
      document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
  }

  // updatedata
  async postUpdate()
  {
       if (this.postForm.valid)
      {
        //console.log(this.postForm.value)
        const formData: any = new FormData();
        formData.append('postname', this.postForm.get('postname')?.value);
        formData.append('description', this.postForm.get('description')?.value);
        if(this.changedImage){
          formData.append('images', this.image);  
        }else{
          formData.append('old_image', this.postForm.get('image')?.value);
        }

        if(this.changedImages){

              //Find if images is from the database or is new
              console.log(this.images,'COMO SE VE IMAGES ARRAY -->')
              for(let img of this.images){
                      if(this.OrigImgsURL.includes(img)){
                        const file = new File([await (await fetch(img)).blob()], img);
                        formData.append('images',file);
                        console.log(file,'COMO SE VE FILE EN ARRAY DE IMAGES AFTER READFILE-->')
                      }else{
                        formData.append('images',img);
                        console.log(img,' LAS NUEVAS IMAGENES-->');
                      }
              };  
        }else{
          
          formData.append('old_images', this.postForm.get('images')?.value);
          console.log(this.postForm.get('images')?.value,'SI NO SE CAMBIA NADA 1-->')         
        }



        if(this.changedpdf){

              //Find if pdf is from the database or is new
              console.log(this.pdf,'COMO SE VE pdf ARRAY -->')
              for(let pdfi of this.pdf){
                      if(this.OrigpdfURL.includes(pdfi)){
                        const file = new File([await (await fetch(pdfi)).blob()], pdfi);
                        formData.append('images',file);
                        console.log(file,'COMO SE VE FILE EN ARRAY DE pdf AFTER READFILE-->')
                      }else{
                        formData.append('images',pdfi);
                        console.log(pdfi,' LAS NUEVAS PDF-->');
                      }
              };  
        }else{
          formData.append('old_pdf', this.postForm.get('pdf')?.value);
          console.log(this.postForm.get('pdf')?.value,'SI NO SE CAMBIA NADA 1-->')         
        }

        console.log(formData.file, 'esto son los datos de form data--->>>>>')

        this.service.updateData(this.table,formData,this.getparamid).subscribe((res)=>{
          console.log(res,'resupdated');
        this.errormsg = undefined;
        this.successmsg = res.message;
            setTimeout(() => 
            {
              this.successmsg = undefined;
            },
            3000);  
        });

      }else
      {
        //console.log('Rellena todos los campos con sus respectivos valores')
        this.successmsg = undefined;
        this.errormsg = 'ERROR: No se han rellenado todos los datos';
            setTimeout(() => 
            {
              this.errormsg = undefined;
            },
            3000);
      }
      document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
  }

}
