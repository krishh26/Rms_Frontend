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
  TokenData: any;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    // this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit() {
    setInterval(() => {
      this.loginUser = this.localStorageService.getLogger();
    }, 500);
    console.log(this.loginUser);
    const tokenData = localStorage.getItem("DecodedToken");
    if (tokenData) {
      try {
        this.TokenData = JSON.parse(tokenData);
        console.log(this.TokenData);
      } catch (error) {
        console.error("Error parsing token data as JSON", error);
      }
    }
  }

  logoutAcrAdmin() {
    this.localStorageService.clearStorage();
    this.router.navigateByUrl('/acr/acr-admin-login')
  }

  logoutDatabaseUser() {
    this.localStorageService.clearStorage();
    this.router.navigateByUrl('/database/database-login')
  }
}
