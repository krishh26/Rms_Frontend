import { Component, OnInit } from '@angular/core';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';

@Component({
  selector: 'app-cir-card',
  templateUrl: './cir-card.component.html',
  styleUrls: ['./cir-card.component.css']
})
export class CirCardComponent implements OnInit {
  futureCards: any = [];

  constructor(
    private cirService: CirSericeService,
  ) { }

  ngOnInit() {
    this.getFutureCard();
  }

  getFutureCard() {
    this.cirService.getFutureCard({
      page: 1, limit: 1000, active: 1
    }).subscribe((response) => {
      if (response && response.data) {
        this.futureCards = response.data;
      } else {
        console.error('Invalid response structure:', response);
      }
    }, (error) => {
      console.log('error', error);
    });
  }
}
