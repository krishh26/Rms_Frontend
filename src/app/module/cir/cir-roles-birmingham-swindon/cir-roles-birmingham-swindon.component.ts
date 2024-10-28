import { Component } from '@angular/core';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
@Component({
  selector: 'app-cir-roles-birmingham-swindon',
  templateUrl: './cir-roles-birmingham-swindon.component.html',
  styleUrls: ['./cir-roles-birmingham-swindon.component.css']
})
export class CirRolesBirminghamSwindonComponent  {

  birminghamDetails = [
    {
      id: 1,
      field: "Advanced Wireless & Connectivity Specialist",
      description: "Expert in advanced digital connectivity technologies such as 5G, Wi-Fi 6/7, and LoRaWAN, as well as AI, sensors, and devices.",
      selected: false
    },
    {
      id: 2,
      field: "Project & Programme Manager",
      description: "Responsible for overseeing digital connectivity projects and ensuring objectives are met effectively.",
      selected: false
    },
    {
      id: 3,
      field: "User Researcher",
      description: "Conducts research to understand user needs and integrates findings into project development.",
      selected: false
    },
    {
      id: 4,
      field: "Connectivity Service Designer",
      description: "Designs connectivity services, considering requirements and ensuring optimal user experience.",
      selected: false
    },
    {
      id: 5,
      field: "Business Analyst",
      description: "Performs data and business analysis to bridge the gap between business needs and technical solutions.",
      selected: false
    },
    {
      id: 6,
      field: "System Designer",
      description: "Designs and structures system components to meet connectivity project requirements.",
      selected: false
    },
    {
      id: 7,
      field: "Solutions Architect",
      description: "Develops digital solutions aligned with business objectives and project requirements.",
      selected: false
    },
    {
      id: 8,
      field: "Data Architect",
      description: "Creates and maintains frameworks for data management and analytics.",
      selected: false
    },
    {
      id: 9,
      field: "Data Modeller",
      description: "Designs data models to support business intelligence and analytics.",
      selected: false
    },
    {
      id: 10,
      field: "Quality Assurance Analyst",
      description: "Ensures quality standards are met through testing and analysis.",
      selected: false
    },
    {
      id: 11,
      field: "Data & Analytics Specialist",
      description: "Utilizes advanced data analysis techniques and tools to support decision-making.",
      selected: false
    },
    {
      id: 12,
      field: "Connectivity Product Manager",
      description: "Manages the development and lifecycle of connectivity products.",
      selected: false
    },
    {
      id: 13,
      field: "Connected Device Product Manager",
      description: "Oversees product development for connected devices in digital ecosystems.",
      selected: false
    },
    {
      id: 14,
      field: "Assurance Analyst",
      description: "Verifies the reliability and efficiency of digital connectivity solutions.",
      selected: false
    },
    {
      id: 15,
      field: "Test Engineer",
      description: "Executes testing procedures to ensure functionality and performance of systems.",
      selected: false
    },
    {
      id: 16,
      field: "Enterprise Architect",
      description: "Plans and develops overarching enterprise systems and strategies.",
      selected: false
    },
    {
      id: 17,
      field: "Network Engineer",
      description: "Specializes in the design and maintenance of network infrastructures.",
      selected: false
    },
    {
      id: 18,
      field: "Software Engineer",
      description: "Responsible for developing software solutions within connectivity projects.",
      selected: false
    },
    {
      id: 19,
      field: "Full Stack Developer",
      description: "Develops both frontend and backend components for connectivity-related applications.",
      selected: false
    },
    {
      id: 20,
      field: "Network Testing & Integration Specialist",
      description: "Tests and integrates network components to ensure seamless connectivity.",
      selected: false
    },
    {
      id: 21,
      field: "Network Operations Manager",
      description: "Oversees daily operations of network systems and ensures optimal performance.",
      selected: false
    },
    {
      id: 22,
      field: "Learning & Development Manager",
      description: "Directs training programs to build expertise in digital connectivity technologies.",
      selected: false
    },
    {
      id: 23,
      field: "Training Provider",
      description: "Provides training services to support skill development in digital connectivity.",
      selected: false
    },
    {
      id: 24,
      field: "Change Management Specialist",
      description: "Guides organizations through digital connectivity changes and ensures smooth transitions.",
      selected: false
    },
    {
      id: 25,
      field: "Stakeholder Engagement Specialist",
      description: "Fosters strong relationships with stakeholders to support connectivity initiatives.",
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
    const selectedRoles = this.birminghamDetails
      .filter(item => item.selected)
      .map(item => ({ name: item.field, description: item.description }));

    if (selectedRoles.length === 0) {
      this.notificationService.showError('Please select at least one role');
      return;
    }

    const payload = {
      name: "Client 5",
      location: "Birmingham", // Fill in the location if needed
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
