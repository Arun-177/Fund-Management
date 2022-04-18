import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeScreenTableMatComponent } from './home-screen-table-mat.component';

describe('HomeScreenTableMatComponent', () => {
  let component: HomeScreenTableMatComponent;
  let fixture: ComponentFixture<HomeScreenTableMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeScreenTableMatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeScreenTableMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
