import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDataBaseLoginComponent } from './show-data-base-login.component';

describe('ShowDataBaseLoginComponent', () => {
  let component: ShowDataBaseLoginComponent;
  let fixture: ComponentFixture<ShowDataBaseLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowDataBaseLoginComponent]
    });
    fixture = TestBed.createComponent(ShowDataBaseLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
