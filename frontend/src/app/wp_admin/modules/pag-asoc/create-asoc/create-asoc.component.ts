import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ApiService } from '../../../../services/api.service';
import { ScrollToTopComponent } from '../../../shared/components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-create-asoc',
  standalone: true,
  imports: [MaterialFileInputModule, CommonModule, MatButton, MatCardModule, MatIcon, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, HttpClientModule, ScrollToTopComponent],
  templateUrl: './create-asoc.component.html',
  styleUrl: './create-asoc.component.scss'
})
export class CreateAsocComponent implements OnInit{
  
  constructor(private service:ApiService, private router:ActivatedRoute){  }
  
  table: any = 'associations';
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
          this.AsocForm.patchValue({
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

  AsocForm = new FormGroup({
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
       if (this.AsocForm.valid)
      {
        //console.log(this.AsocForm.value)

        const formData: any = new FormData();
        formData.append('title', this.AsocForm.get('title')?.value);
        formData.append('location', this.AsocForm.get('location')?.value);
        formData.append('contactinf', this.AsocForm.get('contactinf')?.value);
        formData.append('image', this.image);
        formData.append('description', this.AsocForm.get('description')?.value);

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
       if (this.AsocForm.valid)
      {
        //console.log(this.AsocForm.value)

        const formData: any = new FormData();
        formData.append('title', this.AsocForm.get('title')?.value);
        formData.append('location', this.AsocForm.get('location')?.value);
        formData.append('contactinf', this.AsocForm.get('contactinf')?.value);
        formData.append('description', this.AsocForm.get('description')?.value);
        if(this.changedImage){
          formData.append('image', this.image);  
        }else{
          formData.append('image', this.AsocForm.get('image')?.value);
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

