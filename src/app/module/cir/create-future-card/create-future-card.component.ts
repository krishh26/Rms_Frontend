import { Component } from '@angular/core';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-future-card',
  templateUrl: './create-future-card.component.html',
  styleUrls: ['./create-future-card.component.css']
})
export class CreateFutureCardComponent {

  futureCards: any[] = [];
  showModal: boolean = true;
  inputValue: string = '';
  showLoader: boolean = false;


  constructor(
    private cirservice: CirSericeService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.getFuturecard();
  }


  getFuturecard() {
    this.cirservice.getFutureCard().subscribe((response) => {
      if (response && response.data) { // Check if response and response.data exist
        this.futureCards = response.data;
      } else {
        console.error('Invalid response structure:', response);
      }
    }, (error) => {
      console.log('error', error);
    });
  }

  createCard() {
    if (this.inputValue) {

      this.cirservice.createFutureCard({ name: this.inputValue }).subscribe((response) => {
        if (response && response.data) {
          this.inputValue = '';
          this.getFuturecard();
        }
      }, (error) => {
        console.log('error', error);
      });

    }
  }

  // deleteCard(event: MouseEvent, id: string) {
  //   event.stopPropagation();
  //   this.cirservice.deleteFutureCard(id).subscribe((response) => {
  //     if (response && response.data) {
  //       this.getFuturecard();
  //     }
  //   }, (error) => {
  //     console.log('error', error);
  //   });
  // }

  deleteCard(event: MouseEvent, id: string) {
    event.stopPropagation();
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!'
    }).then((result: any) => {
      if (result?.value) {
        this.showLoader = true;
        this.cirservice.deleteFutureCard(id).subscribe((response: any) => {
          if (response?.status == true) {
            this.showLoader = false;
            this.notificationService.showSuccess('Card successfully deleted');
            this.getFuturecard();
          } else {
            this.showLoader = false;
            this.notificationService.showError(response?.message);
          }
        }, (error) => {
          this.showLoader = false;
          this.notificationService.showError(error?.message);
        });
      }
    });
  }

  toggleCardStatus(event: any, id: string) {
    event.stopPropagation();
    const isActive = event.target.checked ? 1 : 0;

    this.showLoader = true;
    this.cirservice.updateFutureCardStatus(id, { active: isActive }).subscribe((response: any) => {
      if (response?.status == true) {
        this.showLoader = false;
        this.notificationService.showSuccess(isActive ? 'Card activated successfully' : 'Card deactivated successfully');
        this.getFuturecard(); // Refresh the list to get updated data
      } else {
        this.showLoader = false;
        this.notificationService.showError(response?.message);
        // Revert the toggle if API call fails
        event.target.checked = !event.target.checked;
      }
    }, (error: any) => {
      this.showLoader = false;
      this.notificationService.showError(error?.message);
      // Revert the toggle if API call fails
      event.target.checked = !event.target.checked;
    });
  }

}
