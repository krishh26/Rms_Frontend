import { LocalStorageService } from './../../../services/local-storage/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thank-you-refer',
  templateUrl: './thank-you-refer.component.html',
  styleUrls: ['./thank-you-refer.component.css']
})
export class ThankYouReferComponent implements OnInit {
  loginUser: any;
  referredBy : string ='';

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    const loginData = this.localStorageService.getLogger();
    if (loginData) {
      this.loginUser = loginData;
      this.referredBy = this.loginUser?.referredBy
    }
  }
}
