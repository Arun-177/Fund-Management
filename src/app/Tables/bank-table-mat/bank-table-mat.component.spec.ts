import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankTableMatComponent } from './bank-table-mat.component';

describe('BankTableMatComponent', () => {
  let component: BankTableMatComponent;
  let fixture: ComponentFixture<BankTableMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankTableMatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankTableMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
