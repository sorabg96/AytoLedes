import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
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
  selector: 'app-create-political-party',
  standalone: true,
  imports: [MaterialFileInputModule, CommonModule, MatButton, MatCardModule, MatIcon, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, HttpClientModule, ScrollToTopComponent],
  templateUrl: './create-political-party.component.html',
  styleUrl: './create-political-party.component.scss'
})
export class CreatePoliticalPartyComponent {
  constructor(private service:ApiService, private router:ActivatedRoute){  }
  
  table: any = 'politicalparty';
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
          this.PoliticalPartyForm.patchValue({
              title:res.data[0].title,
              orden:res.data[0].orden,
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
  titleFormControl = new FormControl('', [Validators.required]);
  ordenFormGroup = new FormControl('');
  
  //FormGroup for validators

  PoliticalPartyForm = new FormGroup({
    image: this.imageFormControl,
    title: this.titleFormControl,
    orden: this.ordenFormGroup
  });

  //Create post and show message
    errormsg: string | undefined;
    successmsg: string | undefined;

  postSubmit() {
       if (this.PoliticalPartyForm.valid)
      {
        //console.log(this.PoliticalPartyForm.value)

        const formData: any = new FormData();
        formData.append('image', this.image);
        formData.append('title', this.PoliticalPartyForm.get('title')?.value);

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
       if (this.PoliticalPartyForm.valid)
      {
        //console.log(this.PoliticalPartyForm.value)

        const formData: any = new FormData();
        formData.append('orden', this.PoliticalPartyForm.get('orden')?.value);
        formData.append('title', this.PoliticalPartyForm.get('title')?.value);
        if(this.changedImage){
          formData.append('image', this.image);  
        }else{
          formData.append('image', this.PoliticalPartyForm.get('image')?.value);
        }

        console.log(formData.file, 'esto son los datos de form data')
        
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
