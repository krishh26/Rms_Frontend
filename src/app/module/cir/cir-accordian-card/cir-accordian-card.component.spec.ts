import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirAccordianCardComponent } from './cir-accordian-card.component';

describe('CirAccordianCardComponent', () => {
  let component: CirAccordianCardComponent;
  let fixture: ComponentFixture<CirAccordianCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CirAccordianCardComponent]
    });
    fixture = TestBed.createComponent(CirAccordianCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
