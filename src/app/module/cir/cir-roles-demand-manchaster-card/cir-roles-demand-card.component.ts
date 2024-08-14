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
      id: 15,
      field: "<b>None Interested in this Contract</b>",
      description: "-",
      selected: false,
    },
    {
      id: 1,
      field: "Functional Test Analyst",
      description: "The Functional Test Analyst will be responsible for designing, developing, and executing functional test cases to ensure that software applications meet the required functional specifications. This role involves reviewing requirements, creating test plans, writing test scripts, and executing tests to identify defects. The Functional Test Analyst works closely with developers and business analysts to understand the business needs and ensure that the software functions as intended. The role also includes documenting test results, reporting defects, and participating in the overall testing process to ensure high-quality software delivery.",
      selected: false
    },
    {
      id: 2,
      field: "System Integration Test Analyst",
      description: "The System Integration Test Analyst will be responsible for validating that different components or systems work together as expected. This role involves developing and executing integration test cases, ensuring that data flows correctly between integrated systems, and identifying and resolving integration issues. The System Integration Test Analyst works closely with developers, business analysts, and other stakeholders to understand the interactions between systems and to ensure that they integrate seamlessly. The role also includes documenting test results, reporting integration issues, and ensuring that integrated systems meet the required specifications and performance criteria.",
      selected: false
    },
    {
      id: 3,
      field: "Performance Test Analyst",
      description: "Responsible for initiating and ensuring the technical and delivery-facing leadership for all aspects of load and performance testing at portfolio level. Initiating and influencing best practice and standards. Building capabilities to effectively deliver performance testing including within complex technical landscapes, promoting the reuse of toolsets and frameworks across the organisation. Ensuring the delivery of performance testing including influencing how the team develop user stories and acceptance criteria related to the overall QA approach, typically using agile and CI/CD methods. Building QAT service capability and initiating performance testing practices to support the digital service standard, often working as part of a multi-disciplinary team focused on user needs.",
      selected: false
    },
    {
      id: 4,
      field: "End to End Test Manager/Programme Test Manager/Test Delivery Manager",
      description: "The End to End Test Manager will be responsible for overseeing the entire testing process across multiple systems and teams to ensure that the end-to-end solution meets the overall business requirements. This role involves coordinating the testing activities across different teams, managing test schedules, and ensuring that all testing phases (functional, integration, performance, etc.) are completed on time and to the required standard. The End to End Test Manager also ensures that all dependencies between systems are tested and that any defects are tracked and resolved. The role requires strong leadership skills, the ability to manage complex projects, and effective communication with stakeholders.",
      selected: false
    },
    {
      id: 5,
      field: "Programme Test Manager",
      description: "The Programme Test Manager will be responsible for managing the testing efforts across multiple projects within a program. This role involves developing and implementing a test strategy that aligns with the program's objectives, coordinating the testing activities across different projects, and ensuring that testing resources are effectively utilized. The Programme Test Manager works closely with project managers, developers, and business stakeholders to ensure that the testing process is efficient and effective. The role includes tracking testing progress, managing risks and issues, and ensuring that all deliverables meet the required quality standards.",
      selected: false
    },
    {
      id: 6,
      field: "Accessibility Tester",
      description: "The Accessibility Tester will be responsible for ensuring that software applications are accessible to users with disabilities, in compliance with accessibility standards such as WCAG (Web Content Accessibility Guidelines). This role involves conducting accessibility testing using both automated tools and manual methods, identifying accessibility issues, and providing recommendations for improvements. The Accessibility Tester works closely with developers and designers to ensure that accessibility is considered throughout the development process. The role also includes documenting accessibility test results, reporting issues, and ensuring that the final product is usable by all users, including those with disabilities.",
      selected: false
    },
    {
      id: 7,
      field: "Data Migration Tester",
      description: "The Data Migration Tester will be responsible for validating the accuracy and completeness of data migration processes, ensuring that data is correctly transferred from legacy systems to new systems. This role involves developing and executing test cases specific to data migration, verifying data mapping, and ensuring that data integrity is maintained throughout the migration process. The Data Migration Tester works closely with data analysts, developers, and business stakeholders to understand the data requirements and to ensure that the migration is successful. The role also includes documenting test results, identifying and resolving data migration issues, and ensuring that the migrated data meets the required standards.",
      selected: false
    },
    {
      id: 8,
      field: "UAT Test Analyst",
      description: "The UAT (User Acceptance Testing) Test Analyst will be responsible for coordinating and conducting user acceptance testing to ensure that the software meets the business requirements and is ready for deployment. This role involves working closely with business users to define UAT scenarios, creating UAT test cases, and guiding users through the testing process. The UAT Test Analyst also collects feedback from users, identifies defects or areas for improvement, and ensures that all issues are resolved before the software goes live. The role includes documenting UAT results, preparing reports for stakeholders, and ensuring that the final product meets the end-user expectations.",
      selected: false
    },
    {
      id: 9,
      field: "Functional Test Lead",
      description: "The functional test lead should have the ability to work independently providing professional advice, managing and co-ordinating the work of others. The test lead maintains the status of projects and monitors the activities of the team members leading Quality Assurance projects using available test frameworks and tooling. : Lead multiple phases of a projects Participates in reviews of requirements and design documents. Co-ordinates schedules of work and reporting on the progress of all activities against the overall projects plan.Analyses and reports on overall test status and results, identifying issues reporting to stakeholders on test metrics. Performs risk management with the creation of the Test RAID log Defect Management.",
      selected: false
    },
    {
      id: 10,
      field: "UAT Test Lead",
      description: "The UAT Test Lead will be responsible for leading the user acceptance testing process, coordinating the efforts of the UAT team, and ensuring that the UAT phase is completed successfully. This role involves planning and managing the UAT activities, working with business users to define UAT objectives, and ensuring that UAT test cases are executed according to the plan. The UAT Test Lead is responsible for identifying and addressing any issues that arise during UAT, ensuring that the software meets the business requirements, and providing regular updates to stakeholders. The role also includes preparing UAT reports, facilitating communication between the UAT team and other project teams, and ensuring that the final product is ready for deployment.",
      selected: false
    },
    {
      id: 11,
      field: "Performance Test Lead",
      "description": "The Performance Test Lead is responsible for initiating and leading all aspects of QA engineering at the portfolio level, with a focus on technical and delivery-facing leadership. This role involves initiating test automation and test engineering practices, including aspects of 'software development in test'. The Performance Test Lead will read, write, and debug code in complex programs, supporting the refactoring of existing test frameworks and mentoring team members to do the same. The role includes initiating the use of a broad range of tools, including open source and cloud-based solutions, and driving the delivery of test engineering using agile and CI/CD methods. This typically involves influencing the development of user stories and acceptance criteria through Behaviour-Driven Development (BDD) and Test-Driven Development (TDD). Additionally, the Performance Test Lead will build QA service capability, coach others to improve QA-wide practices, and support the digital service standard while working as part of a multi-disciplinary team focused on user needs and user-centered design.",
      selected: false
    },
    {
      id: 12,
      field: "Technical Test Analyst",
      description: "The Technical Test Analyst will be responsible for performing technical testing activities, such as testing software code, APIs, databases, and other technical components. This role involves working closely with developers to understand the technical aspects of the software, creating and executing test scripts, and identifying defects in the technical implementation. The Technical Test Analyst also conducts performance testing, security testing, and other specialized testing activities to ensure that the software meets the required technical standards. The role includes documenting test results, reporting technical issues, and working with the development team to resolve them.",
      selected: false
    },
    {
      id: 13,
      field: "Defect Manager",
      description: "The Defect Manager will be responsible for managing the defect lifecycle, ensuring that all defects are tracked, prioritized, and resolved in a timely manner. This role involves coordinating with different teams to ensure that defects are properly logged, categorized, and assigned to the appropriate resources for resolution. The Defect Manager also monitors the progress of defect resolution, provides regular updates to stakeholders, and ensures that all critical defects are addressed before the software is released. The role includes maintaining defect tracking tools, generating defect reports, and ensuring that the defect management process is efficient and effective.",
      selected: false
    },
    {
      "id": 14,
      "field": "Test Automation Engineer",
      "description": "The Test Automation Engineer will work on quality engineering projects using available frameworks and tools while supporting the senior engineer. This role is responsible for test automation within projects, including selecting methods and tools to ensure effective project control and risk management processes are maintained. The Test Automation Engineer will apply data analysis and data modeling techniques to modify or maintain data structures and associated components. Key responsibilities include creating and executing test scripts, setting up test environments, and creating traceability records from test cases to requirements. Additionally, the engineer will produce test scripts, materials, and regression packs to test new features and updates, ensuring the quality and stability of the software.",
      "selected": false
    }

  ];

  selectedManchester: any[] = [];

  constructor(
    private cirSericeService: CirSericeService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.getDetails();
  }

  submit() {
    let selectedRoles: any = this.manchesterDetails
      .filter(item => item.selected)
      .map(item => ({ name: item.field, description: item.description }));

    if (selectedRoles.length === 0) {
      this.notificationService.showError('Please select at least one role');
      return;
    }

    if (this.selectedManchester?.length > 0) {
      selectedRoles = [...selectedRoles, ...this.selectedManchester]
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

  getDetails() {
    this.cirSericeService.getClientRoles().subscribe((response) => {
      if (response?.status) {
        if (response?.data?.length > 0) {
          const tempData: any[] = response?.data?.filter((item: any) => item.name == 'Client 1');
          tempData?.map((element: any) => {
            if (element?.roles?.length > 0) {
              element?.roles?.map((el: any) => {
                this.selectedManchester.push(el);
              })
            }
          })
        }
      }
    })
  }

  selected(name: string): boolean {
    const data = this.selectedManchester.find((element: any) => element.name == name);
    if (data) {
      return true;
    }
    return false;
  }
}
