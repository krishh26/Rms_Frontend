import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-cir-accordian-card',
  templateUrl: './cir-accordian-card.component.html',
  styleUrls: ['./cir-accordian-card.component.css']
})
export class CirAccordianCardComponent {
  selectedData: any[] = [];
  manchesterrolesTableData = [
    {
      id: 15,
      role: "<b>None Interested in this Contract</b>",
      description: "-",
      selected: false,
    },
    {
      id: 1,
      role: "Functional Test Analyst",
      description: "The Functional Test Analyst will be responsible for designing, developing, and executing functional test cases to ensure that software applications meet the required functional specifications. This role involves reviewing requirements, creating test plans, writing test scripts, and executing tests to identify defects. The Functional Test Analyst works closely with developers and business analysts to understand the business needs and ensure that the software functions as intended. The role also includes documenting test results, reporting defects, and participating in the overall testing process to ensure high-quality software delivery.",
      selected: false
    },
    {
      id: 2,
      role: "System Integration Test Analyst",
      description: "The System Integration Test Analyst will be responsible for validating that different components or systems work together as expected. This role involves developing and executing integration test cases, ensuring that data flows correctly between integrated systems, and identifying and resolving integration issues. The System Integration Test Analyst works closely with developers, business analysts, and other stakeholders to understand the interactions between systems and to ensure that they integrate seamlessly. The role also includes documenting test results, reporting integration issues, and ensuring that integrated systems meet the required specifications and performance criteria.",
      selected: false
    },
    {
      id: 3,
      role: "Performance Test Analyst",
      description: "Responsible for initiating and ensuring the technical and delivery-facing leadership for all aspects of load and performance testing at portfolio level. Initiating and influencing best practice and standards. Building capabilities to effectively deliver performance testing including within complex technical landscapes, promoting the reuse of toolsets and frameworks across the organisation. Ensuring the delivery of performance testing including influencing how the team develop user stories and acceptance criteria related to the overall QA approach, typically using agile and CI/CD methods. Building QAT service capability and initiating performance testing practices to support the digital service standard, often working as part of a multi-disciplinary team focused on user needs.",
      selected: false
    },
    {
      id: 4,
      role: "End to End Test Manager/Programme Test Manager/Test Delivery Manager",
      description: "The End to End Test Manager will be responsible for overseeing the entire testing process across multiple systems and teams to ensure that the end-to-end solution meets the overall business requirements. This role involves coordinating the testing activities across different teams, managing test schedules, and ensuring that all testing phases (functional, integration, performance, etc.) are completed on time and to the required standard. The End to End Test Manager also ensures that all dependencies between systems are tested and that any defects are tracked and resolved. The role requires strong leadership skills, the ability to manage complex projects, and effective communication with stakeholders.",
      selected: false
    },
    {
      id: 5,
      role: "Programme Test Manager",
      description: "The Programme Test Manager will be responsible for managing the testing efforts across multiple projects within a program. This role involves developing and implementing a test strategy that aligns with the program's objectives, coordinating the testing activities across different projects, and ensuring that testing resources are effectively utilized. The Programme Test Manager works closely with project managers, developers, and business stakeholders to ensure that the testing process is efficient and effective. The role includes tracking testing progress, managing risks and issues, and ensuring that all deliverables meet the required quality standards.",
      selected: false
    },
    {
      id: 6,
      role: "Accessibility Tester",
      description: "The Accessibility Tester will be responsible for ensuring that software applications are accessible to users with disabilities, in compliance with accessibility standards such as WCAG (Web Content Accessibility Guidelines). This role involves conducting accessibility testing using both automated tools and manual methods, identifying accessibility issues, and providing recommendations for improvements. The Accessibility Tester works closely with developers and designers to ensure that accessibility is considered throughout the development process. The role also includes documenting accessibility test results, reporting issues, and ensuring that the final product is usable by all users, including those with disabilities.",
      selected: false
    },
    {
      id: 7,
      role: "Data Migration Tester",
      description: "The Data Migration Tester will be responsible for validating the accuracy and completeness of data migration processes, ensuring that data is correctly transferred from legacy systems to new systems. This role involves developing and executing test cases specific to data migration, verifying data mapping, and ensuring that data integrity is maintained throughout the migration process. The Data Migration Tester works closely with data analysts, developers, and business stakeholders to understand the data requirements and to ensure that the migration is successful. The role also includes documenting test results, identifying and resolving data migration issues, and ensuring that the migrated data meets the required standards.",
      selected: false
    },
    {
      id: 8,
      role: "UAT Test Analyst",
      description: "The UAT (User Acceptance Testing) Test Analyst will be responsible for coordinating and conducting user acceptance testing to ensure that the software meets the business requirements and is ready for deployment. This role involves working closely with business users to define UAT scenarios, creating UAT test cases, and guiding users through the testing process. The UAT Test Analyst also collects feedback from users, identifies defects or areas for improvement, and ensures that all issues are resolved before the software goes live. The role includes documenting UAT results, preparing reports for stakeholders, and ensuring that the final product meets the end-user expectations.",
      selected: false
    },
    {
      id: 9,
      role: "Functional Test Lead",
      description: "The functional test lead should have the ability to work independently providing professional advice, managing and co-ordinating the work of others. The test lead maintains the status of projects and monitors the activities of the team members leading Quality Assurance projects using available test frameworks and tooling. : Lead multiple phases of a projects Participates in reviews of requirements and design documents. Co-ordinates schedules of work and reporting on the progress of all activities against the overall projects plan.Analyses and reports on overall test status and results, identifying issues reporting to stakeholders on test metrics. Performs risk management with the creation of the Test RAID log Defect Management.",
      selected: false
    },
    {
      id: 10,
      role: "UAT Test Lead",
      description: "The UAT Test Lead will be responsible for leading the user acceptance testing process, coordinating the efforts of the UAT team, and ensuring that the UAT phase is completed successfully. This role involves planning and managing the UAT activities, working with business users to define UAT objectives, and ensuring that UAT test cases are executed according to the plan. The UAT Test Lead is responsible for identifying and addressing any issues that arise during UAT, ensuring that the software meets the business requirements, and providing regular updates to stakeholders. The role also includes preparing UAT reports, facilitating communication between the UAT team and other project teams, and ensuring that the final product is ready for deployment.",
      selected: false
    },
    {
      "id": 11,
      "role": "Performance Test Lead",
      "description": "The Performance Test Lead is responsible for initiating and leading all aspects of QA engineering at the portfolio level, with a focus on technical and delivery-facing leadership. This role involves initiating test automation and test engineering practices, including aspects of 'software development in test'. The Performance Test Lead will read, write, and debug code in complex programs, supporting the refactoring of existing test frameworks and mentoring team members to do the same. The role includes initiating the use of a broad range of tools, including open source and cloud-based solutions, and driving the delivery of test engineering using agile and CI/CD methods. This typically involves influencing the development of user stories and acceptance criteria through Behaviour-Driven Development (BDD) and Test-Driven Development (TDD). Additionally, the Performance Test Lead will build QA service capability, coach others to improve QA-wide practices, and support the digital service standard while working as part of a multi-disciplinary team focused on user needs and user-centered design.",
      "selected": false
    },
    {
      id: 12,
      role: "Technical Test Analyst",
      description: "The Technical Test Analyst will be responsible for performing technical testing activities, such as testing software code, APIs, databases, and other technical components. This role involves working closely with developers to understand the technical aspects of the software, creating and executing test scripts, and identifying defects in the technical implementation. The Technical Test Analyst also conducts performance testing, security testing, and other specialized testing activities to ensure that the software meets the required technical standards. The role includes documenting test results, reporting technical issues, and working with the development team to resolve them.",
      selected: false
    },
    {
      id: 13,
      role: "Defect Manager",
      description: "The Defect Manager will be responsible for managing the defect lifecycle, ensuring that all defects are tracked, prioritized, and resolved in a timely manner. This role involves coordinating with different teams to ensure that defects are properly logged, categorized, and assigned to the appropriate resources for resolution. The Defect Manager also monitors the progress of defect resolution, provides regular updates to stakeholders, and ensures that all critical defects are addressed before the software is released. The role includes maintaining defect tracking tools, generating defect reports, and ensuring that the defect management process is efficient and effective.",
      selected: false
    },
    {
      "id": 14,
      "role": "Test Automation Engineer",
      "description": "The Test Automation Engineer will work on quality engineering projects using available frameworks and tools while supporting the senior engineer. This role is responsible for test automation within projects, including selecting methods and tools to ensure effective project control and risk management processes are maintained. The Test Automation Engineer will apply data analysis and data modeling techniques to modify or maintain data structures and associated components. Key responsibilities include creating and executing test scripts, setting up test environments, and creating traceability records from test cases to requirements. Additionally, the engineer will produce test scripts, materials, and regression packs to test new features and updates, ensuring the quality and stability of the software.",
      "selected": false
    }

  ];

  northanRolesTableData = [
    {
      id: 8,
      role: "<b>None Interested in this Contract</b>",
      description: "-",
      selected: false,
    },
    {
      id: 1,
      role: "QA / Test Architect",
      description: `
        This is a senior role who provides guidance and strategic direction for the Testing CoE in relation to non-functional and automated testing, providing the following activities:
        - Develop and implement overall testing plans, test scenarios/cases, and test scripts using industry-standard testing tools.
        - Collaborate with software development teams, product owners, and business stakeholders to define testing requirements and test cases.
        - Design and develop automated testing frameworks, tools, and scripts.
        - Analyse test results and provide recommendations on the best approach for improvements.
        - Conduct code reviews and maintain test automation code quality.
        - Up-to-date with new testing technologies, frameworks, and best practices.
        - Preparation and/or execution of tests in the absence of available non-functional tester(s).
        - Represent NFT in strategic reviews.
        - Research, propose, and implement NFT and Automation process improvements and innovations.
      `,
      selected: false
    },
    {
      id: 2,
      role: "QA / Test Manager",
      description: `
       The QA / Test Manager will be responsible for overseeing the quality assurance and testing processes within a project or across multiple projects. This role involves developing and implementing test strategies, managing test planning and execution, and coordinating the efforts of the testing team. The QA / Test Manager ensures that all testing activities align with project objectives and quality standards, collaborates with project stakeholders to integrate testing into the project lifecycle, and monitors testing progress through metrics and reports. Additionally, the role includes managing defect tracking and resolution, maintaining and improving testing practices, and ensuring that the final product meets the required quality standards for deployment.
      `,
      selected: false
    },
    {
      id: 3,
      role: "QA / Functional Test Lead",
      description: `
        - Ability to work independently providing professional advice, managing and coordinating the work of others.
        - Maintain the status of projects and monitor the activities of the team members.
        - Lead multiple phases of a project(s).
        - Participate in reviews of requirements and design documents.
        - Coordinate schedules of work and reporting on the progress of all activities against the overall project(s) plan.
        - Analyse and report on overall test status and results, identifying issues reporting to stakeholders on test metrics.
        - Perform risk management with the creation of the Test RAID log.
        - Defect Management.
      `,
      selected: false
    },
    {
      id: 4,
      role: "QA / Test Analyst",
      description: `
        - Identify and define tests, working alongside business analysts.
        - Monitor test coverage and evaluate the overall quality experienced when testing the Target Test items.
        - Specify the required Test Data and evaluate the outcome of the testing conducted in each test cycle.
        - Report testing progress and issues to QA / Test Manager or Project Manager.
        - Own test scripts and incorporate feedback received from users.
        - Prepare for testing, including developing any required documentation.
        - Manage testing cycles - this includes conducting testing, providing guidance to testers, collating feedback, and working with developers to incorporate feedback into overall development.
        - Take ownership for delivery of testing in conjunction with the pre-defined timelines.
        - Act as an escalation point for issues/potential problems arising from other project team members who are testing.
        - Document and present test results.
        - Communicate progress to all members of the project team and other stakeholders.
      `,
      selected: false
    },
    {
      id: 5,
      role: "Non-Functional Test (NFT) Lead",
      description: `
        - Lead the non-functional project testing effort and be responsible for any non-functional testing-related activities across the organisation.
        - Research, propose, and implement NFT process improvements.
        - Plan and track non-functional projects and resources.
        - Contribute to the initial assessment of in-scope NFT projects.
        - Prepare NFT test plan for in-scope NFT projects.
        - Preparation and/or execution of tests in the absence of available NFT Analyst.
        - Represent NFT in strategic reviews and presentations of products if NFT Architect is unavailable.
      `,
      selected: false
    },
    {
      id: 6,
      role: "Non-Functional Test (NFT) Analyst",
      description: `
        - Involved in the preparation and execution phases of the non-functional test cycle.
        - Support the NFT Lead in planning and closure activities for projects.
        - Feed into NFT Lead at all stages of the project.
        - Build up test environment.
        - Execute test cases, troubleshoot issues, and assist in root cause analysis.
        - Analyse results and report defects.
        - Capture and document knowledge for reuse by team members.
      `,
      selected: false
    },
    {
      id: 7,
      role: "Automation Analyst/Engineer",
      description: `
        - Work on quality engineering projects using available frameworks and tools and supporting the senior engineer.
        - Responsible for test automation within projects.
        - Select methods and tools, ensuring that effective project control and risk management processes are maintained.
        - Apply data analysis and data modelling techniques to modify or maintain data structures and associated components.
        - Create and execute test scripts and set up test environments.
        - Create traceability records, from test cases to requirements.
        - Produce test scripts, materials, and regression packs to test new and amended software or services.
        - Capture and document knowledge for reuse within the team.
      `,
      selected: false
    }
  ];

  qaSpecialistServices = [
    {
      id: 11,
      role: "<b>None Interested in this Contract</b>",
      description: "-",
      selected: false,
    },
    {
      id: 1,
      role: "Quality Assurance Testing (QAT) Specialists",
      description: "Test specialist professionals bought ‘as a service’ and capable of delivering services across the full life cycle of your project or design process.",
      selected: false
    },
    {
      id: 2,
      role: "Quality Assurance (QA) & DevOps",
      description: "To support cost effective continuous release methods within an agile or Dev-Ops environment.",
      selected: false
    },
    {
      id: 3,
      role: "Load & Performance Testing",
      description: "To determine how systems perform against specific performance needs and comparative baselines, including under load and stress.",
      selected: false
    },
    {
      id: 4,
      role: "Quality Assurance (QA) & Testing",
      description: "To establish and manage an appropriate level of QA and testing in line with programme delivery plans, validation and verification of a system against specifications and requirements covering functional and non-functional aspects.",
      selected: false
    },
    {
      id: 5,
      role: "Infrastructure Testing",
      description: "To test the performance of system infrastructures, including network provisions and hosting across LAN, WAN and cloud infrastructures.",
      selected: false
    },
    {
      id: 6,
      role: "Operational Acceptance Testing (OAT)",
      description: "This service focuses on testing and assuring the operational readiness of your system(s). This may include Service Readiness Testing, resilience and disaster recovery.",
      selected: false
    },
    {
      id: 7,
      role: "Strategic Quality Assurance Consultant (Senior)",
      description: "Strategic consultancy support across all aspects of the test and systems development life cycle.",
      selected: false
    },
    {
      id: 8,
      role: "Accessibility Quality Assurance (QA) and Testing",
      description: "To assess how far a product or service is easy for its intended audience to use (includes users who access the service via a range of assistive technologies like screen readers, voice recognition and input devices).",
      selected: false
    },
    {
      id: 9,
      role: "Security Quality Assurance (QA) and Testing",
      description: "To identify threats and measure potential vulnerabilities. The testing scope includes the whole system and not just the software involved. Much of the testing will be automated, supported by advanced exploratory testing and cyber-related defence and assessments.",
      selected: false
    },
    {
      id: 10,
      role: "Quality Assurance (QA) Capability Development",
      description: "Support for all aspects of growing civil servant capability within the QA specialism including learning and development, recruitment, knowledge management and graduate/apprentice onboarding.",
      selected: false
    }
  ];
  futureCards: any = [];
  constructor(
    private cirSericeService: CirSericeService,
    private notificationService: NotificationService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.getFutureCard();
    this.getDetails();
  }

  cards: any[] = [];

  getFutureCard() {
    this.cirSericeService.getPublicFutureCard({
      page: 1, limit: 1000, active: 1
    }).subscribe((response) => {
      if (response && response.data) {
        this.futureCards = response.data;
        this.futureCards?.forEach((element: any) => {
          const data = {
            name: element?.name,
            location: element?.location,
            _id: element?._id,
            roles: [] as any
          }
          if (element?.roles?.length > 0) {
            element?.roles?.forEach((role: any) => {
              data.roles.push({
                id: role?._id,
                role: role?.title,
                description: role?.description,
                selected: false,
              })
            });
          }
          if (data?.roles?.length > 0) {
            this.cards?.push(data);
          }
        });
        console.log("his.cards", this.cards)
      }
    }, (error) => {
      console.log('error', error);
    });
  }

  getDetails() {
    const rolesData: any = localStorage.getItem('rmsRolesDetails');
    if (rolesData || rolesData !== undefined || rolesData !== 'undefined') {
      const roles = JSON.parse(rolesData);
      console.log(roles)
      if (roles?.client1?.roles?.length > 0) {
        roles?.client1?.roles?.map((el: any) => {
          this.selectedData.push(el);
          const data: any = this.manchesterrolesTableData.find((element) => element.role == el.name);
          data['selected'] = true;
        })
      }

      if (roles?.client2?.roles?.length > 0) {
        roles?.client2?.roles?.map((el: any) => {
          this.selectedData.push(el);
          const data: any = this.northanRolesTableData.find((element) => element.role == el.name);
          data['selected'] = true;
        })
      }

      if (roles?.client3?.roles?.length > 0) {
        roles?.client3?.roles?.map((el: any) => {
          this.selectedData.push(el);
          const data: any = this.qaSpecialistServices.find((element) => element.role == el.name);
          data['selected'] = true;
        })
      }
      // this.cirSericeService.getClientRoles().subscribe((response) => {
      //   if (response?.status) {
      //     if (response?.data?.length > 0) {
      //       const tempData: any[] = response?.data?.filter((item: any) => item.name == 'Client 2' || 'Client 1' || 'Client 3');
      //       tempData?.map((element: any) => {
      //         if (element?.roles?.length > 0) {
      //           element?.roles?.map((el: any) => {
      //             this.selectedData.push(el);
      //           })
      //         }
      //       })
      //     }
      //   }
      // })
    }
  }

  selected(name: string): boolean {
    const data = this.selectedData.find((element: any) => element.name == name);
    if (data) {
      return true;
    }
    return false;
  }

  submit() {

    var payload: any = {};
    var isSelected: boolean = false;

    this.cards?.forEach((element: any, index: number) => {
      const roles = element?.roles
        .filter((item: any) => item.selected)
        .map((item: any) => ({ name: item.role, description: item.description })) || [];

      if (roles?.length > 0) {
        isSelected = true;
      }

      payload['client' + (index + 1)] = {
        name: element?.name,
        location: element?.location,
        roles: roles
      };
    });

    console.log("payload", payload);

    // const UKSelected = this.qaSpecialistServices
    //   .filter(item => item.selected)
    //   .map(item => ({ name: item.role, description: item.description }));
    // const UKSelectedPayload = {
    //   name: "Client 3",
    //   location: "All Over UK",
    //   roles: UKSelected
    // };

    // const northanRolesTableData = this.northanRolesTableData
    //   .filter(item => item.selected)
    //   .map(item => ({ name: item.role, description: item.description }));

    // const northanRolesPayload = {
    //   name: "Client 2",
    //   location: "Northan Ireland Only",
    //   roles: northanRolesTableData
    // };

    // const manchesterrolesTableData = this.manchesterrolesTableData
    //   .filter(item => item.selected)
    //   .map(item => ({ name: item.role, description: item.description }));

    // const manchesterrolesPayload = {
    //   name: "Client 1",
    //   location: "Machester Only",
    //   roles: manchesterrolesTableData
    // };

    // if (UKSelected?.length === 0 && northanRolesTableData?.length === 0 && manchesterrolesTableData?.length === 0) {
    //   this.notificationService.showError('Please select atleast 1 option in each Contract to move to next page');
    //   return;
    // }

    // const payloadData = {
    //   client1: manchesterrolesPayload,
    //   client2: northanRolesPayload,
    //   client3: UKSelectedPayload
    // }
    // const loginData = this.localStorageService.getLogger();
    // if (!loginData) {
    //   this.notificationService.showError('User not register');
    //   return;
    // }  

    if (!isSelected) {
      this.notificationService.showError('Please select atleast 1 option in each Contract to move to next page');
      return;
    }

    localStorage.setItem('rmsRolesDetails', JSON.stringify(payload));
    this.router.navigate(['/cir/cir-otherdetails-form']);

    // this.cirSericeService.updateUserClient(payloadData, loginData?.user?._id || loginData?._id).subscribe((response) => {
    //   if (response?.status) {
    //     this.notificationService.showSuccess('Client update Successful');
    //     this.router.navigate(['/cir/cir-otherdetails-form']);
    //   } else {
    //     this.notificationService.showError('User not referred');
    //   }
    // }, (error) => {
    //   this.notificationService.showError(error?.error?.message || 'User not referred');
    // }
    // );
  }
}
