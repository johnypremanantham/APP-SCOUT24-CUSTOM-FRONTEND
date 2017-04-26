/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditmarketComponent } from './editmarket.component';

describe('EditmarketComponent', () => {
  let component: EditmarketComponent;
  let fixture: ComponentFixture<EditmarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
