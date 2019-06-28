import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReferencePage } from './purchase-reference.page';

describe('PurchaseReferencePage', () => {
  let component: PurchaseReferencePage;
  let fixture: ComponentFixture<PurchaseReferencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseReferencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReferencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
