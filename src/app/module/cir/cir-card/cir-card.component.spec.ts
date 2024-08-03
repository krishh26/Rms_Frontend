import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirCardComponent } from './cir-card.component';

describe('CirCardComponent', () => {
  let component: CirCardComponent;
  let fixture: ComponentFixture<CirCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CirCardComponent]
    });
    fixture = TestBed.createComponent(CirCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
