import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SosModalComponent } from './sos-modal.component';

describe('SosModalComponent', () => {
  let component: SosModalComponent;
  let fixture: ComponentFixture<SosModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SosModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
