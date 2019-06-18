import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSuccessPage } from './report-success.page';

describe('ReportSuccessPage', () => {
  let component: ReportSuccessPage;
  let fixture: ComponentFixture<ReportSuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSuccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
