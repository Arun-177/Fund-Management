import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTableMatComponent } from './stock-table-mat.component';

describe('StockTableMatComponent', () => {
  let component: StockTableMatComponent;
  let fixture: ComponentFixture<StockTableMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockTableMatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTableMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
