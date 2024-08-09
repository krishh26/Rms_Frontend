import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouReferComponent } from './thank-you-refer.component';

describe('ThankYouReferComponent', () => {
  let component: ThankYouReferComponent;
  let fixture: ComponentFixture<ThankYouReferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThankYouReferComponent]
    });
    fixture = TestBed.createComponent(ThankYouReferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
