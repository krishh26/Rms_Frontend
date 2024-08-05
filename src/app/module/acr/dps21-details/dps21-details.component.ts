import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcrServiceService } from 'src/app/services/acr-service/acr-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-dps21-details',
  templateUrl: './dps21-details.component.html',
  styleUrls: ['./dps21-details.component.css']
})
export class Dps21DetailsComponent implements OnInit {

  dps21: any = [
    {
      checked: false,
      roleInDemand: "Quality Assurance Testing (QAT) Specialists",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "Quality Assurance (QA) & DevOps",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "Load & Performance Testing",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "Quality Assurance (QA) & Testing",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "Infrastructure Testing",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "6 Operational Acceptance Testing (OAT)",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "Strategic Quality Assurance Consultant (Sr)",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "Accessibility Quality Assurance (QA) and Testing",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "Security Quality Assurance (QA) and Testing",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "Quality Assurance (QA) Capability Development",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
  ]

  file: any;
  constructor(
    private acrSericeService: AcrServiceService,
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

    this.dps21?.map((element: any) => {
      if (element?.checked) {
        element['file'] = this.file;
        element['type'] = 'ACR';
        data.push(element)
      }
    });

    if (data?.length == 0) {
      return this.notificationService.showError('Please select role');
    }

    data?.map((el: any) => {
      delete el['checked'];
    });

    this.acrSericeService.sendResume(data).subscribe((response) => {
      if (response?.status) {
        this.router.navigate(['/acr/acr-card']);
        this.notificationService.showSuccess('Thank you for filling the details, Our team will get back to you shortly');
      } else {
        this.notificationService.showError(response?.message || 'Resume not uploaded.')
      }
    }, (error) => {
      this.notificationService.showError(error?.message || 'Resume Not Send.')
    })
  }

  fileUpload(event: any): void {
    const file = event.target.files[0];
    const data = new FormData();
    data.append('files', file || '');

    this.acrSericeService.fileUpload(data).subscribe((response) => {
      if (response?.status) {
        this.file = response?.data;
        this.notificationService.showSuccess(response?.message || 'File successfully uploaded.')
      } else {
        this.notificationService.showError(response?.message || 'File not uploaded.')
      }
    }, (error) => {
      this.notificationService.showError(error?.message || 'File not uploaded.')
    })
  }
}
