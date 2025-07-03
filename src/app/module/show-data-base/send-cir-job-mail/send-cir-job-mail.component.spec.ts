import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCirJobMailComponent } from './send-cir-job-mail.component';

describe('SendCirJobMailComponent', () => {
  let component: SendCirJobMailComponent;
  let fixture: ComponentFixture<SendCirJobMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendCirJobMailComponent]
    });
    fixture = TestBed.createComponent(SendCirJobMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
