import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AcrServiceService } from 'src/app/services/acr-service/acr-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contract-wise-details',
  templateUrl: './contract-wise-details.component.html',
  styleUrls: ['./contract-wise-details.component.css']
})
export class ContractWiseDetailsComponent implements OnInit {
  contractDetails: any[] = [];
  contractId: string = '';
  loading = false;
  detailsForm!: FormGroup;
  isSubmitting = false;
  isEditMode = false;
  currentDetail: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private acrService: AcrServiceService
  ) { }

  ngOnInit(): void {
    this.contractId = this.route.snapshot.paramMap.get('contractId') || '';
    this.initForm();
    this.loadContractDetails();
  }

  initForm(): void {
    this.detailsForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  loadContractDetails(): void {
    this.loading = true;
    this.acrService.getContractDetails(this.contractId).subscribe({
      next: (response) => {
        this.contractDetails = response.data || response || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading contract details:', error);
        this.toastr.error('Failed to load contract details');
        this.loading = false;
      }
    });
  }



  openAddDetailsModal(content: any): void {
    this.isEditMode = false;
    this.currentDetail = null;
    this.detailsForm.reset();
    this.modalService.open(content, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
  }

  editDetail(content: any, detail: any): void {
    this.isEditMode = true;
    this.currentDetail = detail;
    this.detailsForm.patchValue({
      title: detail.title,
      description: detail.description
    });
    this.modalService.open(content, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
  }

  closeModal(): void {
    this.modalService.dismissAll();
    this.detailsForm.reset();
    this.isSubmitting = false;
    this.isEditMode = false;
    this.currentDetail = null;
  }

  submitDetails(): void {
    if (this.detailsForm.valid) {
      this.isSubmitting = true;

      const payload = {
        title: this.detailsForm.value.title,
        description: this.detailsForm.value.description,
        contractId: this.contractId
      };

      if (this.isEditMode && this.currentDetail) {
        // Update existing contract detail
        this.acrService.updateContractDetails(this.currentDetail._id, payload).subscribe({
          next: (response) => {
            this.toastr.success('Contract details updated successfully!');
            this.closeModal();
            this.loadContractDetails(); // Refresh the list
            this.isSubmitting = false;
          },
          error: (error) => {
            console.error('Error updating contract details:', error);
            this.toastr.error('Failed to update contract details');
            this.isSubmitting = false;
          }
        });
      } else {
        // Create new contract detail
        this.acrService.createContractDetails(payload).subscribe({
          next: (response) => {
            this.toastr.success('Contract details added successfully!');
            this.closeModal();
            this.loadContractDetails(); // Refresh the list
            this.isSubmitting = false;
          },
          error: (error) => {
            console.error('Error creating contract details:', error);
            this.toastr.error('Failed to add contract details');
            this.isSubmitting = false;
          }
        });
      }
    } else {
      this.toastr.error('Please fill all required fields');
      Object.keys(this.detailsForm.controls).forEach(key => {
        this.detailsForm.controls[key].markAsTouched();
      });
    }
  }

  deleteDetail(detail: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${detail.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!'
    }).then((result: any) => {
      if (result?.value) {
        this.loading = true;
        this.acrService.deleteContractDetails(detail._id).subscribe({
          next: (response: any) => {
            this.loading = false;
            if (response?.status == true || response) {
              this.toastr.success('Contract detail successfully deleted');
              this.loadContractDetails(); // Refresh the list
            } else {
              this.toastr.error(response?.message || 'Failed to delete contract detail');
            }
          },
          error: (error) => {
            this.loading = false;
            this.toastr.error(error?.message || 'Failed to delete contract detail');
          }
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/acr/acr-create-contract']);
  }
}
