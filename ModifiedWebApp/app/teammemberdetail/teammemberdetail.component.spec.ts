import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeammemberdetailComponent } from './teammemberdetail.component';

describe('TeammemberdetailComponent', () => {
  let component: TeammemberdetailComponent;
  let fixture: ComponentFixture<TeammemberdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeammemberdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeammemberdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
