import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDatabaseComponent } from './show-database.component';

describe('ShowDatabaseComponent', () => {
  let component: ShowDatabaseComponent;
  let fixture: ComponentFixture<ShowDatabaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowDatabaseComponent]
    });
    fixture = TestBed.createComponent(ShowDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
