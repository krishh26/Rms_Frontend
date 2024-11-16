import { Component } from '@angular/core';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';

@Component({
  selector: 'app-create-future-card',
  templateUrl: './create-future-card.component.html',
  styleUrls: ['./create-future-card.component.css']
})
export class CreateFutureCardComponent {
  constructor( private cirservice: CirSericeService){}
  futureCards: any[] = [];
  showModal: boolean = true;
  inputValue: string = ''; 
  ngOnInit()
  {
    this.getFuturecard();
  }


  getFuturecard(){
    this.cirservice.getFutureCard().subscribe((response) => {
      if (response && response.data) { // Check if response and response.data exist
        this.futureCards = response.data;
      } else {
        console.error('Invalid response structure:', response);
      }
    }, (error) => {
      console.log('error',error);
    });
  }

  createCard()
  {
    if(this.inputValue)
    {
    
        this.cirservice.createFutureCard({name:this.inputValue}).subscribe((response) => {
          if (response && response.data) 
          {
            this.inputValue='';
            this.getFuturecard();
          }
           
        }, (error) => {
          console.log('error',error);
        });
      
    }
  }

  deleteCard(event: MouseEvent,id:string)
  {
    event.stopPropagation();
    this.cirservice.deleteFutureCard(id).subscribe((response) => {
      if (response && response.data) 
      {
        this.getFuturecard();
      }
       
    }, (error) => {
      console.log('error',error);
    });
  }
  
}
