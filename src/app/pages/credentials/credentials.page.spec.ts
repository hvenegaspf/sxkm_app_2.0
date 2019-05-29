import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsPage } from './credentials.page';

describe('CredentialsPage', () => {
  let component: CredentialsPage;
  let fixture: ComponentFixture<CredentialsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
