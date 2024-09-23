import { Component, OnInit } from '@angular/core';
import { ScrollToTopComponent } from '../../../shared/components/scroll-to-top/scroll-to-top.component';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-create-serv-muni',
  standalone: true,
  imports: [MaterialFileInputModule, CommonModule, MatButton, MatCardModule, MatIcon, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, HttpClientModule, ScrollToTopComponent],
  templateUrl: './create-serv-muni.component.html',
  styleUrl: './create-serv-muni.component.scss'
})
export class CreateServMuniComponent implements OnInit{
  
  constructor(private service:ApiService, private router:ActivatedRoute){  }
  
  table: any = 'municipal_services';
  getparamid: any;
  image = "";
  imgURL = "assets/No_Image_Available.jpg";
  changedImage!: boolean | false;

  ngOnInit(): void {
    //console.log(this.router.snapshot.paramMap.get('id'),'getid');
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid){
      this.service.getSingleData(this.table,this.getparamid).subscribe((res)=>{
          //console.log(res,'res==>');
          this.munServForm.patchValue({
              title:res.data[0].title,
              description:res.data[0].description,
              contactinf:res.data[0].contactinf,
              location:res.data[0].location,
              image:res.data[0].image
          });
          this.imgURL ='http://localhost:3000/'+res.data[0].image;
          

      });
    }
  }

  //Image


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
       this.image = file ;
       this.changedImage = true; 
       //console.log(this.image);   
    }
  }

  //Validators

  imageFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  titleFormControl = new FormControl('', [Validators.required]);
  locationFormGroup = new FormControl('', [Validators.required]);
  contactinfFormGroup = new FormControl('', [Validators.required]);
  
  //FormGroup for validators

  munServForm = new FormGroup({
    image: this.imageFormControl,
    description: this.descriptionFormControl,
    title: this.titleFormControl,
    location: this.locationFormGroup,
    contactinf: this.contactinfFormGroup
  });

  //Create post and show message
    errormsg: string | undefined;
    successmsg: string | undefined;

  postSubmit() {
       if (this.munServForm.valid)
      {
        //console.log(this.munServForm.value)

        const formData: any = new FormData();
        formData.append('title', this.munServForm.get('title')?.value);
        formData.append('location', this.munServForm.get('location')?.value);
        formData.append('contactinf', this.munServForm.get('contactinf')?.value);
        formData.append('image', this.image);
        formData.append('description', this.munServForm.get('description')?.value);

        //console.log(formData.file, 'esto son los datos de form data')

        this.service.createData(this.table,formData).subscribe((res)=>{
          //console.log(res,'res==>');
          
          this.imgURL = "assets/No_Image_Available.jpg";
          this.errormsg = undefined;
          this.successmsg = res.message;
            setTimeout(() => 
            {
              this.successmsg = undefined;
            },
            5000);  
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

  // updatedata
  postUpdate()
  {
       if (this.munServForm.valid)
      {
        //console.log(this.munServForm.value)

        const formData: any = new FormData();
        formData.append('title', this.munServForm.get('title')?.value);
        formData.append('location', this.munServForm.get('location')?.value);
        formData.append('contactinf', this.munServForm.get('contactinf')?.value);
        formData.append('description', this.munServForm.get('description')?.value);
        if(this.changedImage){
          formData.append('image', this.image);  
        }else{
          formData.append('image', this.munServForm.get('image')?.value);
        }

        //console.log(formData.file, 'esto son los datos de form data')

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

