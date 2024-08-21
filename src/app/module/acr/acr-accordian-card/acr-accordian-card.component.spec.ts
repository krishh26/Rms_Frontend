/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AcrAccordianCardComponent } from './acr-accordian-card.component';

describe('AcrAccordianCardComponent', () => {
  let component: AcrAccordianCardComponent;
  let fixture: ComponentFixture<AcrAccordianCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcrAccordianCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcrAccordianCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
