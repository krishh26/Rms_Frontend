import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acr-form',
  templateUrl: './acr-form.component.html',
  styleUrls: ['./acr-form.component.css']
})
export class AcrFormComponent implements OnInit {

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
