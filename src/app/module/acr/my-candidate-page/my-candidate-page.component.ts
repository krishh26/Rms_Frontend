import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-candidate-page',
  templateUrl: './my-candidate-page.component.html',
  styleUrls: ['./my-candidate-page.component.css']
})
export class MyCandidatePageComponent implements OnInit {

  candidates = [
    { name: 'kishan', email: 'kishan@gmail.com', joiningDate: '21-aug-2024', status: 'Active' ,contractenddate : '21-sep-2024'},
    { name: 'ayush', email: 'ayush@gmail.com', joiningDate: '21-aug-2024', status: 'Active' ,contractenddate : '21-sep-2024'},
    { name: 'gaurang', email: 'gaurang@gmail.com', joiningDate: '21-aug-2024', status: 'Inactive' ,contractenddate : '21-sep-2024'},
    { name: 'mihir', email: 'mihir@gmail.com', joiningDate: '21-aug-2024', status: 'Terminated' ,contractenddate : '21-sep-2024'},
    { name: 'raj', email: 'raj@gmail.com', joiningDate: '21-aug-2024', status: 'Inactive' ,contractenddate : '21-sep-2024'},
    { name: 'mihir', email: 'mihir@gmail.com', joiningDate: '21-aug-2024', status: 'Active' ,contractenddate : '21-sep-2024'},
    { name: 'raj', email: 'raj@gmail.com', joiningDate: '21-aug-2024', status: 'Terminated' ,contractenddate : '21-sep-2024'},
    { name: 'mihir', email: 'mihir@gmail.com', joiningDate: '21-aug-2024', status: 'Active' ,contractenddate : '21-sep-2024'},
    { name: 'raj', email: 'raj@gmail.com', joiningDate: '21-aug-2024', status: 'Terminated' ,contractenddate : '21-sep-2024'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
