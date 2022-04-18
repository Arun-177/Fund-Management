import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Analytics1Component } from './analytics1.component';

describe('Analytics1Component', () => {
  let component: Analytics1Component;
  let fixture: ComponentFixture<Analytics1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Analytics1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Analytics1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
