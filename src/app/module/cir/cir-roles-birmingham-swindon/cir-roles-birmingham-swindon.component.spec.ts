/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CirRolesBirminghamSwindonComponent } from './cir-roles-birmingham-swindon.component';

describe('CirRolesBirminghamSwindonComponent', () => {
  let component: CirRolesBirminghamSwindonComponent;
  let fixture: ComponentFixture<CirRolesBirminghamSwindonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirRolesBirminghamSwindonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirRolesBirminghamSwindonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
