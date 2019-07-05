import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordEditPage } from './password-edit.page';

describe('PasswordEditPage', () => {
  let component: PasswordEditPage;
  let fixture: ComponentFixture<PasswordEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
