/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CirLoginComponent } from './cir-login.component';

describe('CirLoginComponent', () => {
  let component: CirLoginComponent;
  let fixture: ComponentFixture<CirLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
