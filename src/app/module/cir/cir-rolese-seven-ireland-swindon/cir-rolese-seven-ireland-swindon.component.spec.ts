/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CirRoleseSevenIrelandSwindonComponent } from './cir-rolese-seven-ireland-swindon.component';

describe('CirRoleseSevenIrelandSwindonComponent', () => {
  let component: CirRoleseSevenIrelandSwindonComponent;
  let fixture: ComponentFixture<CirRoleseSevenIrelandSwindonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirRoleseSevenIrelandSwindonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirRoleseSevenIrelandSwindonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
