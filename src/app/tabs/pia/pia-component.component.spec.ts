import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiaComponent } from './pia-component.component';

describe('StatusComponent', () => {
  let component: PiaComponent;
  let fixture: ComponentFixture<PiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiaComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
