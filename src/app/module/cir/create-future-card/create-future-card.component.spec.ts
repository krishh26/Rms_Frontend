import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFutureCardComponent } from './create-future-card.component';

describe('CreateFutureCardComponent', () => {
  let component: CreateFutureCardComponent;
  let fixture: ComponentFixture<CreateFutureCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFutureCardComponent]
    });
    fixture = TestBed.createComponent(CreateFutureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
