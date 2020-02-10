import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveCasesComponent } from './live-cases.component';

describe('LiveCasesComponent', () => {
  let component: LiveCasesComponent;
  let fixture: ComponentFixture<LiveCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
