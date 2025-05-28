import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureCardDetailsComponent } from './future-card-details.component';

describe('FutureCardDetailsComponent', () => {
  let component: FutureCardDetailsComponent;
  let fixture: ComponentFixture<FutureCardDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FutureCardDetailsComponent]
    });
    fixture = TestBed.createComponent(FutureCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
