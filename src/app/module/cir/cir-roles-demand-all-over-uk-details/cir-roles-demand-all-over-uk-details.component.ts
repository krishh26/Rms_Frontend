import { Component } from '@angular/core';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-cir-roles-demand-all-over-uk-details',
  templateUrl: './cir-roles-demand-all-over-uk-details.component.html',
  styleUrls: ['./cir-roles-demand-all-over-uk-details.component.css']
})
export class CirRolesDemandAllOverUkDetailsComponent {

  allOverUkDetails = [
    {
      id: 11,
      field: "<b>None Interested in this Contract</b>",
      description: "-",
      selected: false
    },
    {
      id: 1,
      field: "Quality Assurance Testing (QAT) Specialists",
      description: "Test specialist professionals bought ‘as a service’ and capable of delivering services across the full life cycle of your project or design process.",
      selected: false
    },
    {
      id: 2,
      field: "Quality Assurance (QA) & DevOps",
      description: "To support cost effective continuous release methods within an agile or Dev-Ops environment.",
      selected: false
    },
    {
      id: 3,
      field: "Load & Performance Testings",
      description: "To determine how systems perform against specific performance needs and comparative baselines, including under load and stress.",
      selected: false
    },
    {
      id: 4,
      field: "Quality Assurance (QA) & Testing",
      description: "To establish and manage an appropriate level of QA and testing in line with programme delivery plans, validation and verification of a system against specifications and requirements covering functional and non-functional aspects.",
      selected: false
    },
    {
      id: 5,
      field: "Infrastructure Testing",
      description: "To test the performance of system infrastructures, including network provisions and hosting across LAN, WAN and cloud infrastructures.",
      selected: false
    },
    {
      id: 6,
      field: "Operational Acceptance Testing (OAT)",
      description: "This service focuses on testing and assuring the operational readiness of your system(s). This may include Service Readiness Testing, resilience and disaster recovery.",
      selected: false
    },
    {
      id: 7,
      field: "Strategic Quality Assurance Consultant (Senior)",
      description: "Strategic consultancy support across all aspects of the test and systems development life cycle.",
      selected: false
    },
    {
      id: 8,
      field: "Accessibility Quality Assurance (QA) and Testing",
      description: "To assess how far a product or service is easy for its intended audience to use (includes users who access the service via a range of assistive technologies like screen readers, voice recognition and input devices).",
      selected: false
    },
    {
      id: 9,
      field: "Security Quality Assurance (QA) and Testing",
      description: "To identify threats and measure potential vulnerabilities. The testing scope includes the whole system and not just the software involved. Much of the testing will be automated, supported by advanced exploratory testing and cyber-related defence and assessments.",
      selected: false
    },
    {
      id: 10,
      field: "Quality Assurance (QA) Capability Development",
      description: "Support for all aspects of growing civil servant capability within the QA specialism including learning and development, recruitment, knowledge management and graduate/apprentice onboarding.",
      selected: false
    }
  ];

  selectedData: any[] = [];

  constructor(
    private cirSericeService: CirSericeService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.getDetails();
  }

  submit() {
    const selectedRoles = this.allOverUkDetails
      .filter(item => item.selected)
      .map(item => ({ name: item.field, description: item.description }));

    if (selectedRoles.length === 0) {
      this.notificationService.showError('Please select at least one role');
      return;
    }

    const payload = {
      name: "Client 3",
      location: "All Over UK", // Fill in the location if needed
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

  getDetails() {
    this.cirSericeService.getClientRoles().subscribe((response) => {
      if (response?.status) {
        if (response?.data?.length > 0) {
          const tempData: any[] = response?.data?.filter((item: any) => item.name == 'Client 3');
          tempData?.map((element: any) => {
            if (element?.roles?.length > 0) {
              element?.roles?.map((el: any) => {
                this.selectedData.push(el);
              })
            }
          })
        }
      }
    })
  }

  selected(name: string): boolean {
    const data = this.selectedData.find((element: any) => element.name == name);
    if (data) {
      return true;
    }
    return false;
  }
}
