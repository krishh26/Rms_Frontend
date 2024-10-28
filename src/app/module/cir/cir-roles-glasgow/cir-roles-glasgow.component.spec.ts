/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CirRolesGlasgowComponent } from './cir-roles-glasgow.component';

describe('CirRolesGlasgowComponent', () => {
  let component: CirRolesGlasgowComponent;
  let fixture: ComponentFixture<CirRolesGlasgowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirRolesGlasgowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirRolesGlasgowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
