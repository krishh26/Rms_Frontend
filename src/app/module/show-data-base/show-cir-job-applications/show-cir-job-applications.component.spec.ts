import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCirJobApplicationsComponent } from './show-cir-job-applications.component';

describe('ShowCirJobApplicationsComponent', () => {
  let component: ShowCirJobApplicationsComponent;
  let fixture: ComponentFixture<ShowCirJobApplicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowCirJobApplicationsComponent]
    });
    fixture = TestBed.createComponent(ShowCirJobApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
