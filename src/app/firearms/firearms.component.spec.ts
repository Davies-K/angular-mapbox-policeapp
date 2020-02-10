import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirearmsComponent } from './firearms.component';

describe('FirearmsComponent', () => {
  let component: FirearmsComponent;
  let fixture: ComponentFixture<FirearmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirearmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirearmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
