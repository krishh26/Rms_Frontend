import { Component, OnInit } from '@angular/core';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-cir-roles-glasgow',
  templateUrl: './cir-roles-glasgow.component.html',
  styleUrls: ['./cir-roles-glasgow.component.css']
})
export class CirRolesGlasgowComponent implements OnInit {

  glasgowDettails = [
    {
      id: 1,
      field: "Digital Specialist",
      description: "Provides support in digital transformation projects.",
      selected: false
    },
    {
      id: 2,
      field: "Project/Programme Manager",
      description: "Manages digital projects/programmes, ensuring objectives are met.",
      selected: false
    },
    {
      id: 3,
      field: "User Researcher",
      description: "Conducts user research to understand and implement user needs into project development.",
      selected: false
    },
    {
      id: 4,
      field: "Business Analyst",
      description: "Bridges the gap between business requirements and technical solutions, performing data and business analysis.",
      selected: false
    },
    {
      id: 5,
      field: "Solutions Architect",
      description: "Designs digital solutions to meet business requirements and objectives.",
      selected: false
    },
    {
      id: 6,
      field: "Data Modeller",
      description: "Specializes in creating and maintaining data models to support business intelligence and analytics.",
      selected: false
    },
    {
      id: 7,
      field: "Digital Consultant",
      description: "Provides consultancy services for digital transformation, guiding organizations to meet their digital goals.",
      selected: false
    },
    {
      id: 8,
      field: "Consultant",
      description: "Offers expert advice in various domains of digital transformation.",
      selected: false
    },
    {
      id: 9,
      field: "Application Development/Technical Architect",
      description: "Develops and architects software solutions to support digital projects.",
      selected: false
    },
    {
      id: 10,
      field: "Software Engineer",
      description: "Responsible for software development and engineering to support technical solutions.",
      selected: false
    },
    {
      id: 11,
      field: "Risk Manager",
      description: "Identifies and manages risks within digital transformation projects.",
      selected: false
    },
    {
      id: 12,
      field: "Data Analytics Specialist",
      description: "Provides expertise in data analysis, using tools and technologies to support business decision-making.",
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
    const selectedRoles = this.glasgowDettails
      .filter(item => item.selected)
      .map(item => ({ name: item.field, description: item.description }));

    if (selectedRoles.length === 0) {
      this.notificationService.showError('Please select at least one role');
      return;
    }

    const payload = {
      name: "Client 4",
      location: "Glasgow",
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
