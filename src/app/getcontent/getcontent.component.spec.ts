/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GetcontentComponent } from './getcontent.component';

describe('GetcontentComponent', () => {
  let component: GetcontentComponent;
  let fixture: ComponentFixture<GetcontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetcontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
