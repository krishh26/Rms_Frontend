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
      roleInDemand: "QA / Test Architect",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      roleInDemand: "QA / Test Manager",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      roleInDemand: "QA/Functional Test Lead",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      roleInDemand: "QA / Test Analyst",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      roleInDemand: "Non-Functional Test (NFT) Lead",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
      roleInDemand: "Non-Functional Test (NFT) Analyst",
      roleDescription: "Ref NI_Roles.PDF",
      qualification: "NONE Specified by Client",
      relevantExperience: "",
      workLocation: "",
      expectedRate: "",
      file: ""
    },
    {
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
        this.notificationService.showSuccess('Thank you for filling the details, Our team will get back to you shortly')
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
