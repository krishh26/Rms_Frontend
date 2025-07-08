import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rms';
  loginUser: any;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    const tokenData = localStorage.getItem("DecodedToken");
    if (tokenData) {
      try {
        this.loginUser = JSON.parse(tokenData);
        console.log('Decoded Token in App:', this.loginUser);
      } catch (error) {
        console.error("Error parsing token data as JSON", error);
      }
    }
  }
}
