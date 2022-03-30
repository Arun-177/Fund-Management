import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatStockTableComponent } from './mat-stock-table.component';

describe('MatStockTableComponent', () => {
  let component: MatStockTableComponent;
  let fixture: ComponentFixture<MatStockTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatStockTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatStockTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
