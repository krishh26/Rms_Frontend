/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AcrDatabaseListComponent } from './acr-database-list.component';

describe('AcrDatabaseListComponent', () => {
  let component: AcrDatabaseListComponent;
  let fixture: ComponentFixture<AcrDatabaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcrDatabaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcrDatabaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
