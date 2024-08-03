import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patterns } from '../../../shared/constant/validation-patterns.const';

@Component({
  selector: 'app-acr-login',
  templateUrl: './acr-login.component.html',
  styleUrls: ['./acr-login.component.css']
})
export class AcrLoginComponent implements OnInit {
  loginForm!: FormGroup;
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
    this.router.navigate(['/acr/acr-card']);
  }

  // Hide show password functionality
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
