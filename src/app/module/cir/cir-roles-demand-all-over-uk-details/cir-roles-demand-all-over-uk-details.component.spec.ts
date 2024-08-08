import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirRolesDemandAllOverUkDetailsComponent } from './cir-roles-demand-all-over-uk-details.component';

describe('CirRolesDemandAllOverUkDetailsComponent', () => {
  let component: CirRolesDemandAllOverUkDetailsComponent;
  let fixture: ComponentFixture<CirRolesDemandAllOverUkDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CirRolesDemandAllOverUkDetailsComponent]
    });
    fixture = TestBed.createComponent(CirRolesDemandAllOverUkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
