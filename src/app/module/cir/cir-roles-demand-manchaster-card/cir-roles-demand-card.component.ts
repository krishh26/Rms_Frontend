import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cir-roles-demand-card',
  templateUrl: './cir-roles-demand-card.component.html',
  styleUrls: ['./cir-roles-demand-card.component.css']
})
export class CirRolesDemandCardComponent implements OnInit {
  manchesterDetails = [
    {
      id: 1,
      field : "Functional Test Analyst",
      description : "Specifications not available on this day"
    },
    {
      id: 2,
      field : "System Integration Test Analyst",
      description : "Specifications not available on this day"
    },
    {
      id: 3,
      field : "Performance Test Analyst",
      description : "Specifications not available on this day"
    },
    {
      id: 4,
      field : "End to End Test Manager/Programme Test Manager/Test Delivery Manager",
      description : "Specifications not available on this day"
    },
    {
      id: 5,
      field : "Programme Test Manager",
      description : "Specifications not available on this day"
    },
    {
      id: 6,
      field : "Accessibility Tester",
      description : "Specifications not available on this day"
    },
    {
      id: 7,
      field : "Data Migration Tester",
      description : "Specifications not available on this day"
    },
    {
      id: 8,
      field : "UAT Test Analyst",
      description : "Specifications not available on this day"
    },
    {
      id: 9,
      field : "Functional Test Lead",
      description : "Specifications not available on this day"
    },
    {
      id: 10,
      field : "UAT Test Lead",
      description : "Specifications not available on this day"
    },
    {
      id: 11,
      field : "Performance Test Lead",
      description : "Specifications not available on this day"
    },
    {
      id: 12,
      field : "Technical Test Analyst",
      description : "Specifications not available on this day"
    },
    {
      id: 13,
      field : "Defect Manager",
      description : "Specifications not available on this day"
    },
    {
      id: 14,
      field : "Test Automation Engineer",
      description : "Specifications not available on this day"
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
