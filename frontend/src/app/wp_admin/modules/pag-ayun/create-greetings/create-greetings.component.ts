import { Component } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ScrollToTopComponent } from '../../../shared/components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-create-greetings',
  standalone: true,
  imports: [MaterialFileInputModule, CommonModule, MatButton, MatCardModule, MatIcon, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, HttpClientModule, ScrollToTopComponent],
  templateUrl: './create-greetings.component.html',
  styleUrl: './create-greetings.component.scss'
})
export class CreateGreetingsComponent {
  constructor(private service:ApiService, private router:ActivatedRoute){  }
  
  table: any = 'greetings';
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
          this.ServForm.patchValue({
              title:res.data[0].title,
              description:res.data[0].description,
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
  
  //FormGroup for validators

  ServForm = new FormGroup({
    image: this.imageFormControl,
    description: this.descriptionFormControl,
    title: this.titleFormControl,
  });

  //Create post and show message
    errormsg: string | undefined;
    successmsg: string | undefined;

  // updatedata
  postUpdate()
  {
       if (this.ServForm.valid)
      {
        //console.log(this.ServForm.value)

        const formData: any = new FormData();
        formData.append('title', this.ServForm.get('title')?.value);
        formData.append('description', this.ServForm.get('description')?.value);
        if(this.changedImage){
          formData.append('image', this.image);  
        }else{
          formData.append('image', this.ServForm.get('image')?.value);
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
