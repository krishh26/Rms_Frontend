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
      checked: false,
      roleInDemand: "Functional Test Analyst",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "System Integration Test Analys",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "Performance Test Analyst",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "End to End Test Manager/Programme Test Manager/Test Delivery Manager",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "Programme Test Manager",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "Accessibility Tester",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "Data Migration Tester",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "UAT Test Analyst",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "Functional Test Lead",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "UAT Test Lead",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "Performance Test Lead",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "Technical Test Analyst",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "Defect Manager",
      roleDescription: "Specifications not available on this day",
      qualification: "ITSQB Foundation Certification JIRA Tooling such as: Selenium, Postman, TestLink, SauceLabs, Quality Centre, BrowserStack",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
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

  submitDetails() {
    if (!this.file) {
      return this.notificationService.showError('Please upload file');
    }
    let data: any = [];
    this.manchesterData?.map((element: any) => {
      if (element?.checked) {
        element['file'] = this.file;
        element['type'] = 'CIR';
        data.push(element)
      }
    });

    if (data?.length == 0) {
      return this.notificationService.showError('Please select role');
    }

    data?.map((el: any) => {
      delete el['checked'];
    });

    this.cirSericeService.sendResume(data).subscribe((response) => {
      if (response?.status) {
        this.router.navigate(['/cir/cir-card']);
        this.notificationService.showSuccess('Thank you for filling the details, Our team will get back to you shortly');
      } else {
        this.notificationService.showError(response?.message || 'Resume not uploaded.')
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message || 'Resume Not Send.')
    })
  }

  fileUpload(event: any): void {
    const file = event.target.files[0];
    const data = new FormData();
    data.append('files', file || '');

    this.cirSericeService.fileUpload(data).subscribe((response) => {
      if (response?.status) {
        this.file = response?.data;
        this.notificationService.showSuccess(response?.message || 'File successfully uploaded.')
      } else {
        this.notificationService.showError(response?.message || 'File not uploaded.')
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message || 'File not uploaded.')
    })
  }
}
