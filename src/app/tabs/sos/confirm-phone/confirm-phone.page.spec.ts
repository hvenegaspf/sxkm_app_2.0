import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPhonePage } from './confirm-phone.page';

describe('ConfirmPhonePage', () => {
  let component: ConfirmPhonePage;
  let fixture: ComponentFixture<ConfirmPhonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPhonePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPhonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
