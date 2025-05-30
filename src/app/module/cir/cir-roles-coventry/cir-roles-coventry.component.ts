import { Component } from '@angular/core';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
@Component({
  selector: 'app-cir-roles-coventry',
  templateUrl: './cir-roles-coventry.component.html',
  styleUrls: ['./cir-roles-coventry.component.css']
})
export class CirRolesCoventryComponent  {

  coventryDetails = [
    {
      id: 1,
      field: "UX Designer",
      description: "Expertise in UX design, creating user-friendly interfaces.",
      selected: false
    },
    {
      id: 2,
      field: "Software Developers (C#, .Net, Web API Full Stack Developers)",
      description: "Expertise in software development, including C#, .Net, Web API full stack development.",
      selected: false
    },
    {
      id: 3,
      field: "Data Engineer, Data Scientist, AI Specialist",
      description: "Expertise in data engineering, data science, and artificial intelligence (AI).",
      selected: false
    },
    {
      id: 4,
      field: "Release Train Engineer",
      description: "Expertise in agile delivery, managing release train operations.",
      selected: false
    },
    {
      id: 5,
      field: "Scrum Master",
      description: "Expertise in Scrum methodology and agile delivery management.",
      selected: false
    },
    {
      id: 6,
      field: "Business Analyst",
      description: "Expertise in business analysis, capturing requirements and facilitating delivery.",
      selected: false
    },
    {
      id: 7,
      field: "Enterprise Architect, Solutions Architect, Security Architect",
      description: "Expertise in IT architecture, covering enterprise, solutions, and security architecture.",
      selected: false
    },
    {
      id: 8,
      field: "Test Quality Assurance (QA)",
      description: "Expertise in test quality assurance processes.",
      selected: false
    },
    {
      id: 9,
      field: "Test Automation",
      description: "Expertise in automated testing and related technologies.",
      selected: false
    },
    {
      id: 10,
      field: "Geographic Information Systems (GIS), Workforce Management, Asset Management",
      description: "Expertise in supporting core capabilities, including GIS, workforce management, and asset management.",
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
    const selectedRoles = this.coventryDetails
      .filter(item => item.selected)
      .map(item => ({ name: item.field, description: item.description }));

    if (selectedRoles.length === 0) {
      this.notificationService.showError('Please select at least one role');
      return;
    }

    const payload = {
      name: "Client 8",
      location: "Coventry", // Fill in the location if needed
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
        this.notificationService.showError(error?.error?.message || 'User not referred');
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
