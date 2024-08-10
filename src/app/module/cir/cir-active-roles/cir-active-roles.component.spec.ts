/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CirActiveRolesComponent } from './cir-active-roles.component';

describe('CirActiveRolesComponent', () => {
  let component: CirActiveRolesComponent;
  let fixture: ComponentFixture<CirActiveRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirActiveRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirActiveRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
