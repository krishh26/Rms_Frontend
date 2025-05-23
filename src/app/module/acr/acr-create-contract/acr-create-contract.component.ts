import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AcrServiceService } from 'src/app/services/acr-service/acr-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acr-create-contract',
  templateUrl: './acr-create-contract.component.html',
  styleUrls: ['./acr-create-contract.component.css']
})
export class AcrCreateContractComponent implements OnInit {
  contractForm!: FormGroup;
  contracts: any[] = [];
  loading = false;
  isEditMode = false;
  currentContract: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private acrService: AcrServiceService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadContracts();
  }

  initForm(): void {
    this.contractForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
  }

  loadContracts(): void {
    this.loading = true;
    this.acrService.getContractList().subscribe({
      next: (response) => {
        this.contracts = response.data || response || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading contracts:', error);
        this.toastr.error('Failed to load contracts');
        this.loading = false;
      }
    });
  }

  openModal(content: any): void {
    this.isEditMode = false;
    this.currentContract = null;
    this.modalService.open(content, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
  }

  editContract(content: any, contract: any): void {
    this.isEditMode = true;
    this.currentContract = contract;
    this.contractForm.patchValue({
      title: contract.title
    });
    this.modalService.open(content, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
  }

  closeModal(): void {
    this.modalService.dismissAll();
    this.contractForm.reset();
    this.isEditMode = false;
    this.currentContract = null;
  }

  submit(): void {
    if (this.contractForm.valid) {
      this.loading = true;

      if (this.isEditMode && this.currentContract) {
        // Update existing contract
        this.acrService.updateContract(this.currentContract._id, this.contractForm.value).subscribe({
          next: (response) => {
            this.toastr.success('Contract updated successfully!');
            this.closeModal();
            this.loadContracts(); // Refresh the list
            this.loading = false;
          },
          error: (error) => {
            console.error('Error updating contract:', error);
            this.toastr.error('Failed to update contract');
            this.loading = false;
          }
        });
      } else {
        // Create new contract
        this.acrService.createContract(this.contractForm.value).subscribe({
          next: (response) => {
            this.toastr.success('Contract created successfully!');
            this.closeModal();
            this.loadContracts(); // Refresh the list
            this.loading = false;
          },
          error: (error) => {
            console.error('Error creating contract:', error);
            this.toastr.error('Failed to create contract');
            this.loading = false;
          }
        });
      }
    } else {
      this.toastr.error('Please fill all required fields');
      Object.keys(this.contractForm.controls).forEach(key => {
        this.contractForm.controls[key].markAsTouched();
      });
    }
  }

  deleteContract(contract: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${contract.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!'
    }).then((result: any) => {
      if (result?.value) {
        this.loading = true;
        this.acrService.deleteContract(contract._id).subscribe({
          next: (response: any) => {
            this.loading = false;
            if (response?.status == true || response) {
              this.toastr.success('Contract successfully deleted');
              this.loadContracts(); // Refresh the list
            } else {
              this.toastr.error(response?.message || 'Failed to delete contract');
            }
          },
          error: (error) => {
            this.loading = false;
            this.toastr.error(error?.message || 'Failed to delete contract');
          }
        });
      }
    });
  }
}
