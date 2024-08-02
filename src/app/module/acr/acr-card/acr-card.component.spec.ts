import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcrCardComponent } from './acr-card.component';

describe('AcrCardComponent', () => {
  let component: AcrCardComponent;
  let fixture: ComponentFixture<AcrCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcrCardComponent]
    });
    fixture = TestBed.createComponent(AcrCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
