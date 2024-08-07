/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CirRolesDemandCardComponent } from './cir-roles-demand-card.component';

describe('CirRolesDemandCardComponent', () => {
  let component: CirRolesDemandCardComponent;
  let fixture: ComponentFixture<CirRolesDemandCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirRolesDemandCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirRolesDemandCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
