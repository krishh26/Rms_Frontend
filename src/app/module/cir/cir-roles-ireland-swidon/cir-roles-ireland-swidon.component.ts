import { Component } from '@angular/core';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-cir-roles-ireland-swidon',
  templateUrl: './cir-roles-ireland-swidon.component.html',
  styleUrls: ['./cir-roles-ireland-swidon.component.css']
})
export class CirRolesIrelandSwidonComponent  {

   irelandSwindonDetails = [
    {
      "id": 1,
      "field": "Project Manager",
      "description": "",
      "selected": false
    },
    {
      "id": 2,
      "field": "Data Migration Specialist",
      "description": "",
      "selected": false
    },
    {
      "id": 3,
      "field": "SAP HR BW/Business Intelligence Consultant",
      "description": "",
      "selected": false
    },
    {
      "id": 4,
      "field": "Solution Architect",
      "description": "",
      "selected": false
    },
    {
      "id": 5,
      "field": "FIORI Consultant",
      "description": "",
      "selected": false
    },
    {
      "id": 6,
      "field": "BO/BJ Consultant",
      "description": "",
      "selected": false
    },
    {
      "id": 7,
      "field": "SAP HR Employee Self Service/Manager Self Service Consultants",
      "description": "",
      "selected": false
    },
    {
      "id": 8,
      "field": "SAP Integration Specialist",
      "description": "",
      "selected": false
    },
    {
      "id": 9,
      "field": "SAP Fiori App Developer",
      "description": "",
      "selected": false
    },
    {
      "id": 10,
      "field": "SAP Process Specialist",
      "description": "",
      "selected": false
    },
    {
      "id": 11,
      "field": "SAP MDG Specialist",
      "description": "",
      "selected": false
    },
    {
      "id": 12,
      "field": "SAP S/4 HANA Finance Master Data",
      "description": "",
      "selected": false
    },
    {
      "id": 13,
      "field": "ERP Consultant",
      "description": "",
      "selected": false
    },
    {
      "id": 14,
      "field": "ERP Support Specialist",
      "description": "",
      "selected": false
    },
    {
      "id": 15,
      "field": "Change Management Consultant",
      "description": "",
      "selected": false
    },
    {
      "id": 16,
      "field": "SAP Business Objects Expert",
      "description": "",
      "selected": false
    },
    {
      "id": 17,
      "field": "Governance and Controls Expert",
      "description": "",
      "selected": false
    },
    {
      "id": 18,
      "field": "ERP Architect",
      "description": "",
      "selected": false
    },
    {
      "id": 19,
      "field": "ERP Consultant (Technical)",
      "description": "",
      "selected": false
    },
    {
      "id": 20,
      "field": "SAP Basis Support Specialist",
      "description": "",
      "selected": false
    },
    {
      "id": 21,
      "field": "ABAP Support Specialist",
      "description": "",
      "selected": false
    },
    {
      "id": 22,
      "field": "ERP Architect",
      "description": "",
      "selected": false
    },
    {
      "id": 23,
      "field": "ERP Consultant (Technical)",
      "description": "",
      "selected": false
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
    const selectedRoles = this.irelandSwindonDetails
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
