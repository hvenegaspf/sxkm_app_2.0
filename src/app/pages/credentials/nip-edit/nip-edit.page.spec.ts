import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NipEditPage } from './nip-edit.page';

describe('NipEditPage', () => {
  let component: NipEditPage;
  let fixture: ComponentFixture<NipEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NipEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NipEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
