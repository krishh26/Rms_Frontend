import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDataBaseDetailsComponent } from './show-data-base-details.component';

describe('ShowDataBaseDetailsComponent', () => {
  let component: ShowDataBaseDetailsComponent;
  let fixture: ComponentFixture<ShowDataBaseDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowDataBaseDetailsComponent]
    });
    fixture = TestBed.createComponent(ShowDataBaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
