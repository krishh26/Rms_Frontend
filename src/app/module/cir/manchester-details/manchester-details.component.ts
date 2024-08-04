import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-manchester-details',
  templateUrl: './manchester-details.component.html',
  styleUrls: ['./manchester-details.component.css']
})
export class ManchesterDetailsComponent implements OnInit {
  manchesterData: any = [
    {
      roleInDemand: "Functional Test Analyst",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      roleInDemand: "System Integration Test Analys",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      roleInDemand: "Performance Test Analyst",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      roleInDemand: "End to End Test Manager/Programme Test Manager/Test Delivery Manager",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      roleInDemand: "Programme Test Manager",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      roleInDemand: "Accessibility Tester",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      roleInDemand: "Data Migration Tester",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      roleInDemand: "UAT Test Analyst",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      roleInDemand: "Functional Test Lead",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      roleInDemand: "UAT Test Lead",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      roleInDemand: "Performance Test Lead",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      roleInDemand: "Technical Test Analyst",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      roleInDemand: "Defect Manager",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      roleInDemand: "Test Automation Engineer",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    }
  ]
  file: any;
  constructor(
    private cirSericeService: CirSericeService,
    private notificationService: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
  }


  submitDetails(item: any) {
    const data = new FormData();
    data.append('rolesInDemand', item?.roleInDemand || '');
    data.append('roleDescription', item?.roleDescription || '');
    data.append('certifications_qualifications', item?.qualification || '');
    data.append('valueA', item?.relevantExperience || '');
    data.append('valueB', item?.workLocation || '');
    data.append('valueC', item?.expectedRate || '');
    data.append('file', item?.file || '');

    this.cirSericeService.sendResume(data).subscribe((response) => {
      if (response?.status) {
        this.router.navigate(['/cir/cir-card']);
        this.notificationService.showSuccess('Thank you for filling the details, Our team will get back to you shortly');
      } else {
        this.notificationService.showError(response?.message || 'Resume not uploaded.')
      }
    }, (error) => {
      this.notificationService.showError(error?.message || 'Resume Not Send.')
    })
  }

  fileUpload(event: any, item: any): void {
    this.file = event.target.files[0];
    item.file = this.file;

    const data = new FormData();
    data.append('rolesInDemand', item?.roleInDemand || '');
    data.append('roleDescription', item?.roleDescription || '');
    data.append('certifications_qualifications', item?.qualification || '');
    data.append('valueA', item?.relevantExperience || '');
    data.append('valueB', item?.workLocation || '');
    data.append('valueC', item?.expectedRate || '');
    data.append('file', item?.file || '');

    this.cirSericeService.sendResume(data).subscribe((response) => {
      if (response?.status) {
        this.notificationService.showSuccess(response?.message || 'Resume successfully uploaded.')
      } else {
        this.notificationService.showError(response?.message || 'Resume not uploaded.')
      }
    }, (error) => {
      this.notificationService.showError(error?.message || 'Resume Not Send.')
    })
  }
}
