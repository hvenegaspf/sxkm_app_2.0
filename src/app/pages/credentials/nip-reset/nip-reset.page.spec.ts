import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NipResetPage } from './nip-reset.page';

describe('NipResetPage', () => {
  let component: NipResetPage;
  let fixture: ComponentFixture<NipResetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NipResetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NipResetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
