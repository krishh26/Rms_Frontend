import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendAcrJobMailComponent } from './send-acr-job-mail.component';

describe('SendAcrJobMailComponent', () => {
  let component: SendAcrJobMailComponent;
  let fixture: ComponentFixture<SendAcrJobMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendAcrJobMailComponent]
    });
    fixture = TestBed.createComponent(SendAcrJobMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
