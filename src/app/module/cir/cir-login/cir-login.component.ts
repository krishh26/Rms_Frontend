import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from '../../../shared/constant/validation-patterns.const';
import { Router } from '@angular/router';

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
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
      password: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)])
    });
  }

  ngOnInit() {
  }

  // Function to be used for login
  login() {
    // if (!this.loginForm.valid) {
    //   return
    // }
    console.log('login details', this.loginForm.value)
    this.router.navigate(['/cir/cir-card']);
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
