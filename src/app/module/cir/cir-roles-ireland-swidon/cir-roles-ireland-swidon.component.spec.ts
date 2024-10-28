/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CirRolesIrelandSwidonComponent } from './cir-roles-ireland-swidon.component';

describe('CirRolesIrelandSwidonComponent', () => {
  let component: CirRolesIrelandSwidonComponent;
  let fixture: ComponentFixture<CirRolesIrelandSwidonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirRolesIrelandSwidonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirRolesIrelandSwidonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
