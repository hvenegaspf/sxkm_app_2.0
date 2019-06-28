import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentPage } from './add-payment.page';

describe('AddPaymentPage', () => {
  let component: AddPaymentPage;
  let fixture: ComponentFixture<AddPaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPaymentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
