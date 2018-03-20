import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesCategoriesListComponent } from './expenses-categories-list.component';

describe('ExpensesCategoriesListComponent', () => {
  let component: ExpensesCategoriesListComponent;
  let fixture: ComponentFixture<ExpensesCategoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesCategoriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
