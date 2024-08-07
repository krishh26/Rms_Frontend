/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CirReferEarnComponent } from './cir-refer-earn.component';

describe('CirReferEarnComponent', () => {
  let component: CirReferEarnComponent;
  let fixture: ComponentFixture<CirReferEarnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirReferEarnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirReferEarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
