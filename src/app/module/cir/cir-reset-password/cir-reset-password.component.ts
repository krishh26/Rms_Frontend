import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Patterns } from 'src/app/shared/constant/validation-patterns.const';

@Component({
  selector: 'app-cir-reset-password',
  templateUrl: './cir-reset-password.component.html',
  styleUrls: ['./cir-reset-password.component.css']
})
export class CirResetPasswordComponent implements OnInit {

  resetForm: FormGroup;

  constructor(
    private router: Router,
    private cirservice: CirSericeService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
  ) {
    this.resetForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)]),
      confirmpassword: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)])
    });
  }


  ngOnInit() {
  }

  submit() {

  }
}
