import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankyou-page',
  templateUrl: './thankyou-page.component.html',
  styleUrls: ['./thankyou-page.component.css']
})
export class ThankyouPageComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }

  redirectToLogin() {
    this.router.navigateByUrl('/cir/cir-login');
  }
}
