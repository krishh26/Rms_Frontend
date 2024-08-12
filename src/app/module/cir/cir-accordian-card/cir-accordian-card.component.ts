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
      id: 1,
      role: "Functional Test Analyst",
      description: "Specifications not available on this day",
      selected: false
    },
    {
      id: 2,
      role: "System Integration Test Analyst",
      description: "Specifications not available on this day",
      selected: false
    },
    {
      id: 3,
      role: "Performance Test Analyst",
      description: "Specifications not available on this day",
      selected: false
    },
    {
      id: 4,
      role: "End to End Test Manager/Programme Test Manager/Test Delivery Manager",
      description: "Specifications not available on this day",
      selected: false
    },
    {
      id: 5,
      role: "Programme Test Manager",
      description: "Specifications not available on this day",
      selected: false
    },
    {
      id: 6,
      role: "Accessibility Tester",
      description: "Specifications not available on this day",
      selected: false
    },
    {
      id: 7,
      role: "Data Migration Tester",
      description: "Specifications not available on this day",
      selected: false
    },
    {
      id: 8,
      role: "UAT Test Analyst",
      description: "Specifications not available on this day",
      selected: false
    },
    {
      id: 9,
      role: "Functional Test Lead",
      description: "Specifications not available on this day",
      selected: false
    },
    {
      id: 10,
      role: "UAT Test Lead",
      description: "Specifications not available on this day",
      selected: false
    },
    {
      id: 11,
      role: "Performance Test Lead",
      description: "Specifications not available on this day",
      selected: false
    },
    {
      id: 12,
      role: "Technical Test Analyst",
      description: "Specifications not available on this day",
      selected: false
    },
    {
      id: 13,
      role: "Defect Manager",
      description: "Specifications not available on this day",
      selected: false
    },
    {
      id: 14,
      role: "Test Automation Engineer",
      description: "Specifications not available on this day",
      selected: false
    }
  ];

  northanRolesTableData = [
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
        - Identify, document, and communicate any defects, risks, and issues identified during the testing process and escalate as required.
        - Develop test plans for IT projects using documented business requirements.
        - Ensure that testing risks are managed and issues associated with the testing process are escalated if necessary.
        - Co-operate with users and PMO to agree on the testing strategy to be employed for development projects/release.
        - Take responsibility for all phases of testing and the management of the testing activities within a development project/release.
        - Understand and analyse Business, Functional, Technical, and UI requirements of projects/releases.
        - Define and manage the scope of testing within the context of each project/release.
        - Create test strategy and approach documents for projects/releases, get stakeholder buy-in, and keep documents updated as and when changes are required.
        - Provide test estimates for the types of testing carried out.
        - Create reports and testing metrics as requested by management.
        - Manage testers' work to ensure testing is completed on time and within budget. Resolve conflicts arising between team members or with external team members.
        - Ensure entry criteria are met before starting testing. Ensure exit criteria are met and communicated to stakeholders.
        - Create and sign off test closure forms and obtain approval from stakeholders.
        - Participate in QA reviews and provide required support and clarifications as needed for the reviewers.
        - Ensure all testing deliverables and reports are version controlled and accessible for the testing team and other users.
        - Fulfil the role of testing co-ordinator for a development project or programme of projects.
        - Utilise testing knowledge and experience to assess and advise on the practicality of testing process alternatives. Identify improvements to the process and assist in their implementation.
        - Provide authoritative advice and guidance to colleagues on any aspect of testing, including training for testers throughout subsequent development and testing activities.
        - Plan, arrange, and control meetings, workshops, and relations with user staff during test planning and through subsequent development and testing activities.
        - Take responsibility for the production and approval of all testing deliverables and achievements of testing milestones during a project.
        - Ability to coordinate teams both internally and externally.
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

  constructor(
    private cirSericeService: CirSericeService,
    private notificationService: NotificationService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.getDetails();
  }

  // submitmanchester() {
  //   const selectedRoles = this.manchesterrolesTableData
  //     .filter(item => item.selected)
  //     .map(item => ({ name: item.role, description: item.description }));

  //   if (selectedRoles.length === 0) {
  //     this.notificationService.showError('Please select at least one role');
  //     return;
  //   }
  //   const payload = {
  //     name: "Client 1",
  //     location: "Machester Only",
  //     roles: selectedRoles
  //   };
  //   this.cirSericeService.addClientRoles(payload).subscribe(
  //     (response) => {
  //       if (response?.status) {
  //         this.notificationService.showSuccess('Client update Successful');
  //       } else {
  //         this.notificationService.showError('User not referred');
  //       }
  //     },
  //     (error) => {
  //       this.notificationService.showError(error?.message || 'User not referred');
  //     }
  //   );
  // }

  // submitNorthan() {
  //   const selectedRoles = this.northanRolesTableData
  //     .filter(item => item.selected)
  //     .map(item => ({ name: item.role, description: item.description }));

  //   if (selectedRoles.length === 0) {
  //     this.notificationService.showError('Please select at least one role');
  //     return;
  //   }
  //   const payload = {
  //     name: "Client 2",
  //     location: "Northan Ireland Only",
  //     roles: selectedRoles
  //   };
  //   this.cirSericeService.addClientRoles(payload).subscribe(
  //     (response) => {
  //       if (response?.status) {
  //         this.notificationService.showSuccess('Client update Successful');
  //       } else {
  //         this.notificationService.showError('User not referred');
  //       }
  //     },
  //     (error) => {
  //       this.notificationService.showError(error?.message || 'User not referred');
  //     }
  //   );
  // }

  // submitUK() {
  //   const selectedRoles = this.qaSpecialistServices
  //     .filter(item => item.selected)
  //     .map(item => ({ name: item.role, description: item.description }));

  //   if (selectedRoles.length === 0) {
  //     this.notificationService.showError('Please select at least one role');
  //     return;
  //   }
  //   const payload = {
  //     name: "Client 3",
  //     location: "All Over UK",
  //     roles: selectedRoles
  //   };
  //   this.cirSericeService.addClientRoles(payload).subscribe(
  //     (response) => {
  //       if (response?.status) {
  //         this.notificationService.showSuccess('Client update Successful');
  //       } else {
  //         this.notificationService.showError('User not referred');
  //       }
  //     },
  //     (error) => {
  //       this.notificationService.showError(error?.message || 'User not referred');
  //     }
  //   );
  // }

  getDetails() {
    this.cirSericeService.getClientRoles().subscribe((response) => {
      if (response?.status) {
        if (response?.data?.length > 0) {
          const tempData: any[] = response?.data?.filter((item: any) => item.name == 'Client 2' || 'Client 1' || 'Client 3');
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

  submit() {
    const UKSelected = this.qaSpecialistServices
      .filter(item => item.selected)
      .map(item => ({ name: item.role, description: item.description }));
    const UKSelectedPayload = {
      name: "Client 3",
      location: "All Over UK",
      roles: UKSelected
    };

    const northanRolesTableData = this.northanRolesTableData
      .filter(item => item.selected)
      .map(item => ({ name: item.role, description: item.description }));

    const northanRolesPayload = {
      name: "Client 2",
      location: "Northan Ireland Only",
      roles: northanRolesTableData
    };

    const manchesterrolesTableData = this.manchesterrolesTableData
      .filter(item => item.selected)
      .map(item => ({ name: item.role, description: item.description }));

    const manchesterrolesPayload = {
      name: "Client 1",
      location: "Machester Only",
      roles: manchesterrolesTableData
    };

    if (UKSelected?.length === 0 && northanRolesTableData?.length === 0 && manchesterrolesTableData?.length === 0) {
      this.notificationService.showError('Please select at least one role');
      return;
    }

    const payloadData = {
      client1: manchesterrolesPayload,
      client2: northanRolesPayload,
      client3: UKSelectedPayload
    }
    const loginData = this.localStorageService.getLogger();
    if (!loginData) {
      this.notificationService.showError('User not register');
      return;
    }
    this.cirSericeService.updateUserClient(payloadData, loginData?.user?._id || loginData?._id).subscribe((response) => {
      if (response?.status) {
        this.notificationService.showSuccess('Client update Successful');
        this.router.navigate(['/cir/cir-otherdetails-form']);
      } else {
        this.notificationService.showError('User not referred');
      }
    }, (error) => {
      this.notificationService.showError(error?.message || 'User not referred');
    }
    );
  }
}
