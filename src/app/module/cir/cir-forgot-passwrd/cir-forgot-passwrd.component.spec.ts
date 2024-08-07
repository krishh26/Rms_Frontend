/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CirForgotPasswrdComponent } from './cir-forgot-passwrd.component';

describe('CirForgotPasswrdComponent', () => {
  let component: CirForgotPasswrdComponent;
  let fixture: ComponentFixture<CirForgotPasswrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirForgotPasswrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirForgotPasswrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
