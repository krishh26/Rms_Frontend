import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-Northen-Ireland-details',
  templateUrl: './Northen-Ireland-details.component.html',
  styleUrls: ['./Northen-Ireland-details.component.css']
})
export class NorthenIrelandDetailsComponent implements OnInit {
  tableData: any = [
    {
      checked: false,
      roleInDemand: "QA / Test Architect",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "QA / Test Manager",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "QA/Functional Test Lead",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "QA / Test Analyst",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "Non-Functional Test (NFT) Lead",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "Non-Functional Test (NFT) Analyst",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      checked: false,
      roleInDemand: "Automation Analyst/Engineer",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
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

    this.tableData?.map((element: any) => {
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
