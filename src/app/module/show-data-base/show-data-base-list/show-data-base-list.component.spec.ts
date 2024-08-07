import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDataBaseListComponent } from './show-data-base-list.component';

describe('ShowDataBaseListComponent', () => {
  let component: ShowDataBaseListComponent;
  let fixture: ComponentFixture<ShowDataBaseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowDataBaseListComponent]
    });
    fixture = TestBed.createComponent(ShowDataBaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
