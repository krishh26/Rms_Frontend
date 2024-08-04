import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from '../../../shared/constant/validation-patterns.const';
import { Router } from '@angular/router';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-cir-login',
  templateUrl: './cir-login.component.html',
  styleUrls: ['./cir-login.component.css']
})
export class CirLoginComponent implements OnInit {
  loginForm: FormGroup;
  password = 'password';
  showPassword = false;

  constructor(
    private router: Router,
    private cirservice : CirSericeService,
    private notificationService: NotificationService,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
      password: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)])
    });
  }

  ngOnInit() {
  }


  // login() {
  //   if (!this.loginForm.valid) {
  //     return
  //   }
  //   console.log('login details', this.loginForm.value)
  //   this.router.navigate(['/cir/cir-card']);
  // }

  login(): void {
    this.loginForm.markAllAsTouched();
    console.log('adasdasdasdasd', this.loginForm.valid)
    if (this.loginForm.valid) {
      this.cirservice.loginUser(this.loginForm.value).subscribe((response) => {
        console.log('response', response);
        if (response?.status == true) {
         // this.localStorageService.setLoginToken(response?.data);
         // this.tokenDecode = response?.data?.token;
          // const decoded = jwtDecode(response?.data?.token);
          // this.loginDetails = decoded;
         // this.localStorageService.setLogger(this.loginDetails);
         this.router.navigate(['/cir/cir-card']);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 500);
        } else {
          console.log(

            response?.message
          );
          
           this.notificationService.showError(response?.message);
        }
      }, (error) => {
         this.notificationService.showError(error?.error?.message || 'Something went wrong!');
      })
    }
  }

  public showHidePass(): void {
    if (this.password === 'password') {
      this.password = 'text';
      this.showPassword = true;
    } else {
      this.password = 'password';
      this.showPassword = false;
    }
  }
}
