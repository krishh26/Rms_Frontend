import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-candidate-page',
  templateUrl: './my-candidate-page.component.html',
  styleUrls: ['./my-candidate-page.component.css']
})
export class MyCandidatePageComponent implements OnInit {

  candidates = [
    { name: 'kishan', email: 'kishan@gmail.com', joiningDate: '21-aug-2024', status: 'Active' },
    { name: 'ayush', email: 'ayush@gmail.com', joiningDate: '21-aug-2024', status: 'Active' },
    { name: 'gaurang', email: 'gaurang@gmail.com', joiningDate: '21-aug-2024', status: 'Active' },
    { name: 'mihir', email: 'mihir@gmail.com', joiningDate: '21-aug-2024', status: 'Active' },
    { name: 'raj', email: 'raj@gmail.com', joiningDate: '21-aug-2024', status: 'Active' },
    { name: 'mihir', email: 'mihir@gmail.com', joiningDate: '21-aug-2024', status: 'Active' },
    { name: 'raj', email: 'raj@gmail.com', joiningDate: '21-aug-2024', status: 'Active' },
    { name: 'mihir', email: 'mihir@gmail.com', joiningDate: '21-aug-2024', status: 'Active' },
    { name: 'raj', email: 'raj@gmail.com', joiningDate: '21-aug-2024', status: 'Active' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
