import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirRolesDemandNothernIrelandDetailsComponent } from './cir-roles-demand-nothern-ireland-details.component';

describe('CirRolesDemandNothernIrelandDetailsComponent', () => {
  let component: CirRolesDemandNothernIrelandDetailsComponent;
  let fixture: ComponentFixture<CirRolesDemandNothernIrelandDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CirRolesDemandNothernIrelandDetailsComponent]
    });
    fixture = TestBed.createComponent(CirRolesDemandNothernIrelandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
