import { Component, OnInit } from '@angular/core';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-future-card',
  templateUrl: './create-future-card.component.html',
  styleUrls: ['./create-future-card.component.css']
})
export class CreateFutureCardComponent implements OnInit {

  futureCards: any[] = [];
  showModal: boolean = true;
  inputValue: string = '';
  showLoader: boolean = false;
  isSubmitting: boolean = false;
  editCardData: any = {
    _id: '',
    name: ''
  };
  inputLocation: string = '';

  constructor(
    private cirservice: CirSericeService,
    private notificationService: NotificationService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getFuturecard();
  }

  getFuturecard() {
    this.cirservice.getFutureCard({
      page: 1, limit: 10000
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

  openAddModal(modal: any) {
    this.inputValue = '';
    this.modalService.open(modal, { centered: true });
  }

  createCard() {
    if (!this.inputValue || !this.inputLocation) return;
    const newCard = {
      name: this.inputValue,
      location: this.inputLocation,
    };

    this.isSubmitting = true;
    this.cirservice.createFutureCard(newCard).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.notificationService.showSuccess('Card created successfully');
          this.closeModal();
          this.getFuturecard();
        }
      },
      error: (error) => {
        console.log('error', error);
        this.notificationService.showError('Error creating card');
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

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
          this.notificationService.showError(error?.error?.message);
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
        this.getFuturecard();
      } else {
        this.showLoader = false;
        this.notificationService.showError(response?.message);
        event.target.checked = !event.target.checked;
      }
    }, (error: any) => {
      this.showLoader = false;
      this.notificationService.showError(error?.error?.message);
      event.target.checked = !event.target.checked;
    });
  }

  openEditModal(modal: any, card: any) {
    this.editCardData = {
      _id: card._id,
      name: card?.name,
      location: card?.location
    };
    this.modalService.open(modal, { centered: true });
  }

  closeModal() {
    this.modalService.dismissAll();
    this.editCardData = {
      _id: '',
      name: '',
      location: ''
    };
    this.inputValue = '';
    this.inputLocation = '';
  }

  updateCard() {
    if (!this.editCardData.name.trim()) {
      this.notificationService.showWarning('Please enter a name');
      return;
    }

    this.isSubmitting = true;
    this.cirservice.updateFutureCardStatus(this.editCardData._id, { name: this.editCardData.name, location: this.editCardData.location }).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Card updated successfully');
        this.closeModal();
        this.getFuturecard();
      },
      error: (error) => {
        this.notificationService.showError(error?.error?.message || 'Error updating card');
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
