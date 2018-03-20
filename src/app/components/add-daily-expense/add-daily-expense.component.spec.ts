import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDailyExpenseComponent } from './add-daily-expense.component';

describe('AddDailyExpenseComponent', () => {
  let component: AddDailyExpenseComponent;
  let fixture: ComponentFixture<AddDailyExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDailyExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDailyExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
