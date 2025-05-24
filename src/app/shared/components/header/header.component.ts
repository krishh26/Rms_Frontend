import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginUser!: any;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit() {
  }

  logoutAcrAdmin() {
    this.localStorageService.clearStorage();
    this.router.navigateByUrl('/acr/acr-admin-login')
  }
}
