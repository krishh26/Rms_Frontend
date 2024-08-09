import { Component, OnInit } from '@angular/core';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-cir-roles-demand-card',
  templateUrl: './cir-roles-demand-card.component.html',
  styleUrls: ['./cir-roles-demand-card.component.css']
})
export class CirRolesDemandCardComponent implements OnInit {
  manchesterDetails = [
    {
      id: 1,
      field: "Functional Test Analyst",
      description: "Specifications not available on this day", selected: false
    },
    {
      id: 2,
      field: "System Integration Test Analyst",
      description: "Specifications not available on this day", selected: false
    },
    {
      id: 3,
      field: "Performance Test Analyst",
      description: "Specifications not available on this day", selected: false
    },
    {
      id: 4,
      field: "End to End Test Manager/Programme Test Manager/Test Delivery Manager",
      description: "Specifications not available on this day", selected: false
    },
    {
      id: 5,
      field: "Programme Test Manager",
      description: "Specifications not available on this day", selected: false
    },
    {
      id: 6,
      field: "Accessibility Tester",
      description: "Specifications not available on this day", selected: false
    },
    {
      id: 7,
      field: "Data Migration Tester",
      description: "Specifications not available on this day", selected: false
    },
    {
      id: 8,
      field: "UAT Test Analyst",
      description: "Specifications not available on this day", selected: false
    },
    {
      id: 9,
      field: "Functional Test Lead",
      description: "Specifications not available on this day", selected: false
    },
    {
      id: 10,
      field: "UAT Test Lead",
      description: "Specifications not available on this day", selected: false
    },
    {
      id: 11,
      field: "Performance Test Lead",
      description: "Specifications not available on this day", selected: false
    },
    {
      id: 12,
      field: "Technical Test Analyst",
      description: "Specifications not available on this day", selected: false
    },
    {
      id: 13,
      field: "Defect Manager",
      description: "Specifications not available on this day", selected: false
    },
    {
      id: 14,
      field: "Test Automation Engineer",
      description: "Specifications not available on this day", selected: false
    }
  ]
  constructor(
    private cirSericeService: CirSericeService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  submit() {
    const selectedRoles = this.manchesterDetails
      .filter(item => item.selected)
      .map(item => ({ name: item.field, description: item.description }));

    if (selectedRoles.length === 0) {
      this.notificationService.showError('Please select at least one role');
      return;
    }

    const payload = {
      name: "Client 1",
      location: "Manchester Only", // Fill in the location if needed
      roles: selectedRoles
    };

    this.cirSericeService.addClientRoles(payload).subscribe(
      (response) => {
        if (response?.status) {
          this.notificationService.showSuccess('Client update Successful');
        } else {
          this.notificationService.showError('User not referred');
        }
      },
      (error) => {
        this.notificationService.showError(error?.message || 'User not referred');
      }
    );
  }

}
