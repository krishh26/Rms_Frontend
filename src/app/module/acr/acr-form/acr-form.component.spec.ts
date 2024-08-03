/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AcrFormComponent } from './acr-form.component';

describe('AcrFormComponent', () => {
  let component: AcrFormComponent;
  let fixture: ComponentFixture<AcrFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcrFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
