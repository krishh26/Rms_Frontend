import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcrTableComponent } from './acr-table.component';

describe('AcrTableComponent', () => {
  let component: AcrTableComponent;
  let fixture: ComponentFixture<AcrTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcrTableComponent]
    });
    fixture = TestBed.createComponent(AcrTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
