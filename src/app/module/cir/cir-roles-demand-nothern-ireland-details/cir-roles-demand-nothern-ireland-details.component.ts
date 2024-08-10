import { Component } from '@angular/core';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-cir-roles-demand-nothern-ireland-details',
  templateUrl: './cir-roles-demand-nothern-ireland-details.component.html',
  styleUrls: ['./cir-roles-demand-nothern-ireland-details.component.css']
})
export class CirRolesDemandNothernIrelandDetailsComponent {

  northernIrelandDetails = [
    {
      id: 1,
      field: "QA / Test Architect",
      description: `
        This is a senior role who provides guidance and strategic direction for the Testing CoE in relation to non-functional and automated testing, providing the following activities:
        - Develop and implement overall testing plans, test scenarios/cases, and test scripts using industry-standard testing tools.
        - Collaborate with software development teams, product owners, and business stakeholders to define testing requirements and test cases.
        - Design and develop automated testing frameworks, tools, and scripts.
        - Analyse test results and provide recommendations on the best approach for improvements.
        - Conduct code reviews and maintain test automation code quality.
        - Stay up-to-date with new testing technologies, frameworks, and best practices.
        - Preparation and/or execution of tests in the absence of available non-functional tester(s).
        - Represent NFT in strategic reviews.
        - Research, propose, and implement NFT and Automation process improvements and innovations.
      `,
      selected: false
    },
    {
      id: 2,
      field: "QA / Test Manager",
      description: `
        The QA / Test Manager will identify, document and communicate any defects, risks and issues identified during the testing process and escalate as required. They will work closely with QA Architect, QA Analysts, Business Analysts, Enterprise and Solution Architects, and Project Managers. The QA/Test Manager will be responsible for ensuring that plans for all projects are appropriate to the risk associated with the planned changes.
        - Develop test plans for IT projects using documented business requirements.
        - Ensure that testing risks are managed and issues associated with the testing process are escalated if necessary.
        - Co-operate with users and PMO to agree on the testing strategy to be employed for development projects/releases.
        - Take responsibility for all phases of testing and the management of testing activities within a development project/release.
        - Understand and analyse Business, Functional, Technical and UI requirements of projects/releases.
        - Define and manage the scope of testing within the context of each project/release.
        - Create test strategy and approach documents for projects/releases, get stakeholder buy-in and keep documents updated as and when changes are required.
        - Provide test estimates for the types of testing carried out.
        - Create reports and testing metrics as requested by management.
        - Manage testers' work to ensure testing is completed on time and within budget. Resolve conflicts arising between team members or with external team members.
        - Ensure entry criteria is met before starting testing. Ensure exit criteria is met and communicated to stakeholders. Create and sign off test closure forms and obtain approval from stakeholders.
        - Participate in QA reviews and provide required support and clarifications as needed for the reviewers.
        - Ensure all testing deliverables and reports are version controlled and accessible for the testing team and other users.
        - Fulfil the role of testing co-ordinator for a development project or programme of projects.
        - Utilise testing knowledge and experience to assess and advise on the practicality of testing process alternatives. Identify improvements to the process and assist in their implementation.
        - Provide authoritative advice and guidance to colleagues on any aspect of testing including training for testers throughout subsequent development and testing activities.
        - Plan, arrange and control meetings, workshops and relations with user staff during test planning and through subsequent development and testing activities.
        - Take responsibility for the production and approval of all testing deliverables and achievements of testing milestones during a project.
        - Ability to coordinate teams both internally and externally.
      `,
      selected: false
    },
    {
      id: 3,
      field: "QA/Functional Test Lead",
      description: `
        The functional test lead should have the ability to work independently providing professional advice, managing and co-ordinating the work of others. The test lead maintains the status of projects and monitors the activities of the team members leading Quality Assurance projects using available test frameworks and tooling.
        - Lead multiple phases of a project(s).
        - Participate in reviews of requirements and design documents.
        - Co-ordinate schedules of work and reporting on the progress of all activities against the overall project(s) plan.
        - Analyse and report on overall test status and results, identifying issues, reporting to stakeholders on test metrics.
        - Perform risk management with the creation of the Test RAID log.
        - Defect Management.
      `,
      selected: false
    },
    {
      id: 4,
      field: "QA / Test Analyst",
      description: `
        The QA / Test Analyst will be responsible for initially identifying and subsequently defining tests, working alongside business analysts. They will also monitor the test coverage and evaluate the overall quality experienced when testing the Target Test items. This role also involves specifying the required Test Data and evaluating the outcome of the testing conducted in each test cycle. Where required, they will report directly to the QA / Test Manager or Project Manager on testing progress and any testing issues.
        - Own test scripts and incorporate feedback received from users.
        - Prepare for testing including development of any required documentation.
        - Manage testing cycles - this will include conducting testing, providing guidance to testers, collating feedback and working with developers to incorporate feedback into overall development.
        - Take ownership for delivery of testing in conjunction with the pre-defined timelines.
        - Be an escalation point for issues/potential problems arising from other project team members who are testing.
        - Documentation and presentation of test results.
        - Communicate progress to all members of the project team and other stakeholders.
      `,
      selected: false
    },
    {
      id: 5,
      field: "Non-Functional Test (NFT) Lead",
      description: `
        The NFT Lead will lead the non-functional project testing effort and be responsible for any non-functional testing-related activities across the organisation.
        - Research, propose, and implement NFT process improvement.
        - Plan and track non-functional projects and resources.
        - Contribute to initial assessment of in-scope NFT projects.
        - Preparation of NFT test plan for in-scope NFT projects.
        - Preparation and/or execution of tests in the absence of available NFT Analyst.
        - If NFT Architect is unavailable, represent NFT in strategic reviews and presentations of products.
      `,
      selected: false
    },
    {
      id: 6,
      field: "Non-Functional Test (NFT) Analyst",
      description: `
        The NFT Analyst is primarily involved in the preparation and execution phases of the non-functional test cycle and supporting the NFT Lead in planning and closure activities for projects.
        - Feed into NFT Lead at all stages of the project.
        - Build up test environment.
        - Execute test cases, troubleshoot issues and assist in root cause analysis.
        - Analyse results and report defects.
        - Knowledge transfer – capture and document knowledge that can be re-utilised by team members.
      `,
      selected: false
    },
    {
      id: 7,
      field: "Automation Analyst/Engineer",
      description: `
        The automation engineer will work on quality engineering projects using available frameworks and tools and supporting the senior engineer.
        - Responsible for test automation within projects.
        - Select methods and tools, ensuring that effective project control and risk management processes are maintained.
        - Apply data analysis and data modelling techniques to modify or maintain data structures and associated components.
        - Create and execute test scripts and set up test environments.
        - Create traceability records, from test cases to requirements.
        - Knowledge transfer – capture and document knowledge that can be re-utilised within the team.
        - Produce test scripts, materials and regression packs to test new and amended software or services.
      `,
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
    const selectedRoles = this.northernIrelandDetails
      .filter(item => item.selected)
      .map(item => ({ name: item.field, description: item.description }));

    if (selectedRoles.length === 0) {
      this.notificationService.showError('Please select at least one role');
      return;
    }

    const payload = {
      name: "Client 2",
      location: "Northern Ireland Only", // Fill in the location if needed
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
          const tempData: any[] = response?.data?.filter((item: any) => item.name == 'Client 2');
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
