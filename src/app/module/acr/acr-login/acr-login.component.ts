import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acr-login',
  templateUrl: './acr-login.component.html',
  styleUrls: ['./acr-login.component.css']
})
export class AcrLoginComponent implements OnInit {

  password = 'password';
    currentPassword = 'password';
    confirmPassword = 'password';
    showPassword = false;
    showConfPassword = false;
    showCurrentPassword = false;

  constructor() { }

  ngOnInit() {
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
