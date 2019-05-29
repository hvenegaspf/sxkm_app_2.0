import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SxkmPage } from './sxkm.page';

describe('SxkmPage', () => {
  let component: SxkmPage;
  let fixture: ComponentFixture<SxkmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SxkmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SxkmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
