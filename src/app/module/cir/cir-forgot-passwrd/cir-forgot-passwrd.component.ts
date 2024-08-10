import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Patterns } from 'src/app/shared/constant/validation-patterns.const';

@Component({
  selector: 'app-cir-forgot-passwrd',
  templateUrl: './cir-forgot-passwrd.component.html',
  styleUrls: ['./cir-forgot-passwrd.component.css']
})
export class CirForgotPasswrdComponent implements OnInit {

  forgotpasswordForm: FormGroup;

  constructor(
    private router: Router,
    private cirservice: CirSericeService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
  ) {
    this.forgotpasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
    });
  }


  ngOnInit() {
  }

  submit() {
    this.forgotpasswordForm.markAllAsTouched();
    if (this.forgotpasswordForm.valid) {
      this.cirservice.forgotpassword(this.forgotpasswordForm.value).subscribe((response) => {
        if (response?.status == true) {
          this.localStorageService.setLoginToken(response?.data);
          this.localStorageService.setLogger(response?.data?.user);
        } else if (response?.status == true && response?.message == 'User not found'){
          this.notificationService.showError('Invalid Email Address. Try again with registered Email.');
        }
      }, (error) => {
        this.notificationService.showError('Invalid Email Address. Try again with registered Email.');
      })
    }
  }

}
