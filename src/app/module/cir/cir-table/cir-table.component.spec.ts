import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirTableComponent } from './cir-table.component';

describe('CirTableComponent', () => {
  let component: CirTableComponent;
  let fixture: ComponentFixture<CirTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CirTableComponent]
    });
    fixture = TestBed.createComponent(CirTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
