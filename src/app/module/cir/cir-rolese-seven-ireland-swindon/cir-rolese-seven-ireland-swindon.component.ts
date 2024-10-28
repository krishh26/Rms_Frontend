import { Component } from '@angular/core';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';


@Component({
  selector: 'app-cir-rolese-seven-ireland-swindon',
  templateUrl: './cir-rolese-seven-ireland-swindon.component.html',
  styleUrls: ['./cir-rolese-seven-ireland-swindon.component.css']
})
export class CirRoleseSevenIrelandSwindonComponent {

   contractSevenDetails = [
    {
      id: 1,
      field: "DBA (SQL, Oracle)",
      description: "Expertise in SQL and Oracle databases.",
      selected: false
    },
    {
      id: 2,
      field: "Business Analyst Senior",
      description: "General business analysis expertise (senior level).",
      selected: false
    },
    {
      id: 3,
      field: "Business Analyst Junior",
      description: "General business analysis expertise (junior level).",
      selected: false
    },
    {
      id: 4,
      field: "Solutions Architect",
      description: "Expertise in designing and structuring IT solutions.",
      selected: false
    },
    {
      id: 5,
      field: "Enterprise Architect",
      description: "Expertise in designing the overall enterprise IT architecture.",
      selected: false
    },
    {
      id: 6,
      field: "Data Architect",
      description: "Expertise in creating and managing the data architecture.",
      selected: false
    },
    {
      id: 7,
      field: "Data Analyst",
      description: "Expertise in Azure, QlikSense, and technologies used by CIE.",
      selected: false
    },
    {
      id: 8,
      field: "Data Scientist",
      description: "Expertise in data science using Azure, QlikSense, and CIE technologies.",
      selected: false
    },
    {
      id: 9,
      field: "Data Engineer",
      description: "Expertise in managing and organizing data pipelines.",
      selected: false
    },
    {
      id: 10,
      field: "Data Developer",
      description: "Expertise in developing data-related applications or pipelines.",
      selected: false
    },
    {
      id: 11,
      field: "UI/UX Designer",
      description: "Expertise in user interface and user experience design.",
      selected: false
    },
    {
      id: 12,
      field: "Web/.Net Applications Developer (Senior)",
      description: "Expertise in .Net and technologies used by CIE (senior level).",
      selected: false
    },
    {
      id: 13,
      field: "Web/.Net Applications Developer (Junior)",
      description: "Expertise in .Net and technologies used by CIE (junior level).",
      selected: false
    },
    {
      id: 14,
      field: "CRM Developer (Senior)",
      description: "Expertise in CRM development using technologies by CIE (senior level).",
      selected: false
    },
    {
      id: 15,
      field: "CRM Developer (Junior)",
      description: "Expertise in CRM development using technologies by CIE (junior level).",
      selected: false
    },
    {
      id: 16,
      field: "Integration Platform Developer (Senior)",
      description: "Expertise in integration platform development using CIE technologies (senior level).",
      selected: false
    },
    {
      id: 17,
      field: "Integration Platform Developer (Junior)",
      description: "Expertise in integration platform development using CIE technologies (junior level).",
      selected: false
    },
    {
      id: 18,
      field: "M365 Developer (Senior)",
      description: "Expertise in M365 and Azure (senior level).",
      selected: false
    },
    {
      id: 19,
      field: "M365 Developer (Junior)",
      description: "Expertise in M365 and Azure (junior level).",
      selected: false
    },
    {
      id: 20,
      field: "Tester (Senior)",
      description: "Expertise in testing technologies used by CIE (senior level).",
      selected: false
    },
    {
      id: 21,
      field: "Tester (Junior)",
      description: "Expertise in testing technologies used by CIE (junior level).",
      selected: false
    },
    {
      id: 22,
      field: "Programme Manager",
      description: "Knowledge of IT industry and CIÉ technologies and systems; oversees coordination of projects, products, and strategic initiatives.",
      selected: false
    },
    {
      id: 23,
      field: "Project Manager",
      description: "Responsible for the implementation of projects, including planning, sourcing, and critical path analysis. Handles day-to-day project management activities.",
      selected: false
    },
    {
      id: 24,
      field: "Senior Project Manager",
      description: "Handles the implementation of complex projects, including planning, sourcing, and critical path analysis. Should typically have experience in managing high-level project activities.",
      selected: false
    },
    {
      id: 25,
      field: "Resource Scheduler",
      description: "Manages personnel and task schedules; responsible for effective time management and resource allocation.",
      selected: false
    },
    {
      id: 26,
      field: "Project Administrator",
      description: "Supports project managers by handling reporting, analysis, and other administrative duties.",
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
    const selectedRoles = this.contractSevenDetails
      .filter(item => item.selected)
      .map(item => ({ name: item.field, description: item.description }));

    if (selectedRoles.length === 0) {
      this.notificationService.showError('Please select at least one role');
      return;
    }

    const payload = {
      name: "Client 7",
      location: "Contract Seven Ireland", // Fill in the location if needed
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
