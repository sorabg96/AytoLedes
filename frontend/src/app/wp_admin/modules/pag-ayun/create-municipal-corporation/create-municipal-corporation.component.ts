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
  selector: 'app-create-municipal-corporation',
  standalone: true,
  imports: [MaterialFileInputModule, CommonModule, MatButton, MatCardModule, MatIcon, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, HttpClientModule, ScrollToTopComponent],
  templateUrl: './create-municipal-corporation.component.html',
  styleUrl: './create-municipal-corporation.component.scss'
})
export class CreateMunicipalCorporationComponent {
  constructor(private service:ApiService, private router:ActivatedRoute){  }
  
  table: any = 'municipal_corporation';
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
          this.MunCorForm.patchValue({
              politicalParty:res.data[0].politicalParty,
              fullname:res.data[0].fullname,
              politicalOffice:res.data[0].politicalOffice,
              email:res.data[0].email,
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
  fullnameFormControl = new FormControl('', [Validators.required]);
  politicalPartyFormControl = new FormControl('', [Validators.required]);
  emailFormGroup = new FormControl('', [Validators.required]);
  politicalOfficeFormGroup = new FormControl('', [Validators.required]);
  
  //FormGroup for validators

  MunCorForm = new FormGroup({
    image: this.imageFormControl,
    fullname: this.fullnameFormControl,
    politicalParty: this.politicalPartyFormControl,
    email: this.emailFormGroup,
    politicalOffice: this.politicalOfficeFormGroup
  });

  //Create post and show message
    errormsg: string | undefined;
    successmsg: string | undefined;

  postSubmit() {
       if (this.MunCorForm.valid)
      {
        //console.log(this.MunCorForm.value)

        const formData: any = new FormData();
        formData.append('politicalParty', this.MunCorForm.get('politicalParty')?.value);
        formData.append('email', this.MunCorForm.get('email')?.value);
        formData.append('politicalOffice', this.MunCorForm.get('politicalOffice')?.value);
        formData.append('image', this.image);
        formData.append('fullname', this.MunCorForm.get('fullname')?.value);

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
       if (this.MunCorForm.valid)
      {
        //console.log(this.MunCorForm.value)

        const formData: any = new FormData();
        formData.append('politicalParty', this.MunCorForm.get('politicalParty')?.value);
        formData.append('email', this.MunCorForm.get('email')?.value);
        formData.append('politicalOffice', this.MunCorForm.get('politicalOffice')?.value);
        formData.append('fullname', this.MunCorForm.get('fullname')?.value);
        if(this.changedImage){
          formData.append('image', this.image);  
        }else{
          formData.append('image', this.MunCorForm.get('image')?.value);
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
