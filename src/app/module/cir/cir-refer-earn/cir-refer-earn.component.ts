import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from 'src/app/shared/constant/validation-patterns.const';

@Component({
  selector: 'app-cir-refer-earn',
  templateUrl: './cir-refer-earn.component.html',
  styleUrls: ['./cir-refer-earn.component.css']
})
export class CirReferEarnComponent implements OnInit {
  referForm!: FormGroup;

  constructor() {
    this.referForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
    });
   }

  ngOnInit() {
  }
  submit(){
    this.referForm.markAllAsTouched();
    if (this.referForm.valid) {
      console.log('this.referForm.value :', this.referForm.value);
    }
  }
}
