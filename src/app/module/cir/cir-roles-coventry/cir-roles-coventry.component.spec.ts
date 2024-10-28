/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CirRolesCoventryComponent } from './cir-roles-coventry.component';

describe('CirRolesCoventryComponent', () => {
  let component: CirRolesCoventryComponent;
  let fixture: ComponentFixture<CirRolesCoventryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirRolesCoventryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirRolesCoventryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
