import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpensesCategoryComponent } from './add-expenses-category.component';

describe('AddExpensesCategoryComponent', () => {
  let component: AddExpensesCategoryComponent;
  let fixture: ComponentFixture<AddExpensesCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExpensesCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpensesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
