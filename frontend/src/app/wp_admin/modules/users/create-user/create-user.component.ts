import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';


@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatIcon, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, HttpClientModule],
  providers:[ApiService],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent implements OnInit{

  constructor(private service:ApiService, private router:ActivatedRoute){  }
  
  table: any = 'user';
  getparamid: any;
  
  ngOnInit(): void {
    //console.log(this.router.snapshot.paramMap.get('id'),'getid');
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid){
      this.service.getSingleData(this.table,this.getparamid).subscribe((res)=>{
          console.log(res,'res==>');
          this.userForm.patchValue({
              username:res.data[0].username,
              email:res.data[0].email,
              password:res.data[0].password
          });
      });
    }
  }

  //Validators

  usernameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);


  userForm = new FormGroup({
    username : this.usernameFormControl,
    email: this.emailFormControl,
    password: this.passwordFormControl,
  });

  //Create user and show message
    errormsg: string | undefined;
    successmsg: string | undefined;
    email_errormsg: string | undefined;

  userSubmit() {
      if(this.emailFormControl.hasError('required') ||
      this.usernameFormControl.hasError('required') ||
      this.passwordFormControl.hasError('required'))
      {
        //console.log('Rellena todos los campos con sus respectivos valores')
        this.email_errormsg = undefined;
        this.successmsg = undefined;
        this.errormsg = 'ERROR: No se han rellenado todos los datos';
            setTimeout(() => 
            {
              this.errormsg = undefined;
            },
            3000);
      }
      if(this.emailFormControl.hasError('email') && 
       !this.emailFormControl.hasError('required') &&
       !this.usernameFormControl.hasError('required') &&
       !this.passwordFormControl.hasError('required')
      ) 
      {
        //console.log('Rellena todos los campos con sus respectivos valores')
        this.errormsg = undefined;
        this.successmsg = undefined;
        this.email_errormsg = 'ERROR: No se ha introducido el email';
            setTimeout(() => 
            {
              this.email_errormsg = undefined;
            },
            3000);
      }
       if (this.userForm.valid)
      {
        
        console.log(this.userForm.value)
        this.service.createData(this.table,this.userForm.value).subscribe((res)=>{
          console.log(res,'res==>');
        this.email_errormsg = undefined;
        this.errormsg = res.message1;
        this.successmsg = res.message2;
            setTimeout(() => 
            {
              this.successmsg = undefined;
              this.errormsg = undefined;
            },
            3000);  
        });
      }
      document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
  }

  // updatedata
  userUpdate()
  {
      if(this.emailFormControl.hasError('required') ||
      this.usernameFormControl.hasError('required') ||
      this.passwordFormControl.hasError('required'))
      {
        //console.log('Rellena todos los campos con sus respectivos valores')
        this.email_errormsg = undefined;
        this.successmsg = undefined;
        this.errormsg = 'ERROR: No se han rellenado todos los datos';
            setTimeout(() => 
            {
              this.errormsg = undefined;
            },
            3000);
      }
      if(this.emailFormControl.hasError('email') && 
       !this.emailFormControl.hasError('required') &&
       !this.usernameFormControl.hasError('required') &&
       !this.passwordFormControl.hasError('required')
      ) 
      {
        //console.log('Rellena todos los campos con sus respectivos valores')
        this.errormsg = undefined;
        this.successmsg = undefined;
        this.email_errormsg = 'ERROR: No se ha introducido el email';
            setTimeout(() => 
            {
              this.email_errormsg = undefined;
            },
            3000);
      }
       if (this.userForm.valid)
      {
        this.service.updateData(this.table,this.userForm.value,this.getparamid).subscribe((res)=>{
          console.log(res,'resupdated');
        this.email_errormsg = undefined;
        this.errormsg = res.message1;
        this.successmsg = res.message2;
            setTimeout(() => 
            {
              this.successmsg = undefined;
              this.errormsg = undefined;
            },
            3000);  
        });
      }
      document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
  }

}
