import { Component } from '@angular/core';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-cir-roles-ireland-swidon',
  templateUrl: './cir-roles-ireland-swidon.component.html',
  styleUrls: ['./cir-roles-ireland-swidon.component.css']
})
export class CirRolesIrelandSwidonComponent {

  irelandSwindonDetails = [
    {
      "id": 1,
      "field": "Project Manager",
      "description": "Leads and manages ICT project risks, quality, and progress; ensures timely, on-budget, and quality project completion; manages risk processes for ICT-enabled change",
      "selected": false
    },
    {
      "id": 2,
      "field": "Data Migration Specialist",
      "description": "Designing, writing, and deploying Extract, Transform, and Load (ETL) solutions; extensive knowledge of SQL and database concepts; expertise in SQL Server Integration Services (SSIS) or equivalent technologies for accessing different databases; experience with data extraction, cleaning, and preparation from legacy IT systems; ability to analyze complex data using tools like Excel, Crystal Reports, Access, and SQL; solving data issues like duplication and corruption",
      "selected": false
    },
    {
      "id": 3,
      "field": "SAP HR BW/Business Intelligence Consultant",
      "description": "Expertise in SAP HR BW/BI systems. Proficient in SAP Business Objects and SAP BW for generating reporting solutions. Knowledge of database extraction and cube architecture.",
      "selected": false
    },
    {
      "id": 4,
      "field": "Solution Architect",
      "description": "Expertise in SAP BW/BI architecture design, overseeing the structure of reporting solutions.",
      "selected": false
    },
    {
      "id": 5,
      "field": "FIORI Consultant",
      "description": "Specialized in SAP FIORI and its integration with BW/BI systems for user experience enhancements.",
      "selected": false
    },
    {
      "id": 6,
      "field": "BO/BJ Consultant",
      "description": "Experience in SAP Business Objects (BO) or Business Intelligence (BJ), providing sophisticated reporting solutions using SAP BW/BI tools.",
      "selected": false
    },
    {
      "id": 7,
      "field": "SAP HR Employee Self Service/Manager Self Service Consultants",
      description: `
      The skill sets associated with this role include but are not limited to the following:
      - The HSE HPSA is currently rolling out SAP Employee Self Service/Manager Self Service functionality to their existing customers throughout the HSE.
      - There is a requirement for experienced personnel to assist in the development of this initiative with specific experience in the following areas:
        - UX Design
        - SAP Fiori / SAP Fiori Apps
        - SAP Workflow
        - SAP Solution Architect with specific ESS/MSS expertise
        - SAP JAVA Programmer
    `,
      "selected": false
    },
    {
      "id": 8,
      "field": "SAP Integration Specialist",
      description: `
      The HSE has several SAP and non-SAP systems supporting HR, Payroll, Finance, Procurement, and Business Warehouse. The role of the SAP Integration Specialist requires knowledge and expertise in SAP, other SAP systems, and non-SAP systems to interface with SAP S4 Hana. Responsibilities include:
      - Assist with the planning and implementation of interfaces to SAP S4 Hana.
      - Possess project management skills.
      - Define project tasks and resource requirements.
      - Help coordinate project staff.
      - Assist in planning and scheduling project deliverables and associated timelines.
      - Track project deliverables.
      - Provide direction and support to the project team.
      - Ensure quality assurance on the SAP deployment.
      - Conduct project evaluations and assess results.
      - Assist with the change management process.
    `,
      "selected": false
    },
    {
      "id": 9,
      "field": "SAP Fiori App Developer",
      description: `
      The skill sets associated with this role include but are not limited to the following:
      - Design mobile and desktop technical solutions for standard and custom SAP Fiori applications on SAP S4 Hana.
      - Manage analysis, design, coding, configuration, and testing lifecycles on the SAP S4 Hana platform.
      - Support configuration and integration management mentoring/knowledge transfer.
      - Plan and execute required process steps as defined by the project.
      - Anticipate, identify, track, and resolve issues and risks affecting the SAP applications.
      - Coordinate and participate in structured peer reviews/walkthroughs.
      - Continuously develop industry knowledge and associated SAP Fiori App skills.
      - Conduct project-level priority analysis and planning.
    `,
      "selected": false
    },
    {
      "id": 10,
      "field": "SAP Process Specialist",
      "description": "Explains and elaborates on SAP S4 Hana Catalogue processes; translates SAP processes for use in HSE environments; recommends SAP best practices; advises on process mapping tools (SAP Solution Manager or alternatives); assists in developing SOPs and end-user documentation; maps interface systems into SAP S4 Hana; provides training and solutions for HSE; knowledge of all SAP S4 Hana processes and tools",
      "selected": false
    },
    {
      "id": 11,
      "field": "SAP MDG Specialist",
      "description": "Experience implementing SAP MDG for Finance in large complex organizations; expertise in Finance master data management (cost centers, GL accounts, etc.); understanding of how MDG enhances governance in distributed environments; ability to handle mass Finance master data changes; feeding Finance master data to other SAP systems like HR/Payroll",
      "selected": false
    },
    {
      "id": 12,
      "field": "SAP S/4 HANA Finance Master Data",
      "description": "Understanding of Finance master data objects within S/4 HANA (Universal Journal, in-memory computing); ability to define usage concepts for these objects; experience managing Finance enterprise structures through hierarchies or attributes within MDG; governance and control expertise in managing Finance data",
      "selected": false
    },
    {
      "id": 13,
      "field": "ERP Consultant",
      "description": "Extensive experience in software application architecture and design; expertise in ERP build and development (ABAP/JAVA or equivalent); ability to support and maintain functional applications in an ERP environment; experience with Agile development; strong knowledge of architecture tools like Togaf, SOA, UML",
      "selected": false
    },
    {
      "id": 14,
      "field": "ERP Support Specialist",
      "description": "Responsible for implementing new ERP systems and refactoring older frameworks; collaboration with technical resources to design supporting IT frameworks; acts as SME for design review, deployment planning, security review, and issue resolution; experience with enhancing ERP systems for improved data flow; knowledge of ERP modules including mobile, cloud, and social systems",
      "selected": false
    },
    {
      "id": 15,
      "field": "Change Management Consultant",
      "description": "Expertise in designing, facilitating, and delivering an Impact Analysis Programme; advising on organizational design for local implementation teams; supporting the development of IFMS strategies (Communications, Change Management, and Training); assisting with the design and development of communication outputs under an Integrated Communications Plan",
      "selected": false
    },
    {
      "id": 16,
      "field": "SAP Business Objects Expert",
      "description": "SAP ABAP development for CFI; SAP BW support (technical changeover, maintenance, and upgrades); system architecture (Business Objects deployment); new developments in line with IFMS strategy; configuration support; troubleshooting; report writing and enterprise structure configuration; knowledge transfer and training for the HSE support team; Business Objects/Lumeria suite deployment support",
      "selected": false
    },
    {
      "id": 17,
      "field": "Governance and Controls Expert",
      "description": "Advises on designing Governance, Risk, and Controls (GRC) tools (e.g., access control, process control, risk management, fraud management); ensures compliance with HSE National Financial Regulations, Irish GAAP, SAP Best Practice, and HSE frameworks; designs and manages user/role access to maintain Segregation of Duties (SoD); works with SAP Systems Architect for security roles and emergency access",
      "selected": false
    },
    {
      "id": 18,
      "field": "ERP Architect",
      "description": "Leads and coordinates architecture for new ERP systems and refactors older frameworks; defines technical requirements; collaborates with IT stakeholders to design supporting IT frameworks; acts as SME from design inception to deployment; oversees ERP design, data migration, and deployment plans; experience with ERP systems including mobile, cloud, and social modules; ensures adherence to design constraints",
      "selected": false
    },
    {
      "id": 19,
      "field": "ERP Consultant (Technical)",
      "description": "Extensive experience in software application architecture and ERP build development; expertise in ERP software development (ABAP/JAVA or equivalent); supports system architecture and ensures functionality; excellent understanding of customer requirements; experience in Agile development environments; strong knowledge of architecture tools and methodologies (Togaf, SOA, UML, etc.); focuses on high-quality software solutions",
      "selected": false
    },
    {
      "id": 20,
      "field": "SAP Basis Support Specialist",
      "description": "Support to keep the system running efficiently on an on-going basis; Support as required to assist implementations, approved projects, process improvements, or system changes.",
      "selected": false
    },
    {
      "id": 21,
      "field": "ABAP Support Specialist",
      "description": "Development of new reports and maintenance/upgrade of existing solutions; Support for any System configuration changes required for implementation or subsequent approved projects; General support for Issue investigation/resolution as required for implementation or subsequent approved projects.",
      "selected": false
    },
    {
      "id": 22,
      "field": "ERP Architect",
      "description": "Leads & co-ordinates the optimised architecture of new ERP systems & the refactoring of older frameworks; Defines technical requirements; Designs the supporting IT framework environment; Acts as a subject matter expert for the entire build from design to production.",
      "selected": false
    },
    {
      "id": 23,
      "field": "ERP Consultant (Technical)",
      "description": "Extensive experience designing/architecting enterprise software applications; Expertise in software application architecture, software design, modelling, data modelling; Software Application Development experience in ERP builds developing code specific to the application (example ABAP/JAVA or equivalent).",
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
