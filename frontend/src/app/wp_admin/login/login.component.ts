import { Component} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, CommonModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: {ngSkipHydration: 'true'}
})
export class LoginComponent {

  constructor (private apiservice : ApiService, private router: Router,private cookieService : CookieService, private AuthService : AuthenticationService){}

  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  userForm = new FormGroup({
    username : this.usernameFormControl,
    password: this.passwordFormControl,
  });

    //Create user and show message
    errormsg: string | undefined;
    successmsg: string | undefined;

    onSubmit() {
      if(this.usernameFormControl.hasError('required') ||
      this.passwordFormControl.hasError('required'))
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
       if (this.userForm.valid)
      {
        //console.log(this.userForm.value)
        this.apiservice.login(this.userForm.value).subscribe(
          (res)=>{
            this.AuthService.isLoggedIn = true;
            this.apiservice.triggerRefresh();
            this.router.navigate(["/wp_admin/dashboard"]);
          },
          (err)=>{
            console.log(err)
          }
        );
      }
    }
}
