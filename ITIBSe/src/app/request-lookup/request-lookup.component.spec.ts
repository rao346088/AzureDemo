import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestLookupComponent } from './request-lookup.component';

describe('RequestLookupComponent', () => {
  let component: RequestLookupComponent;
  let fixture: ComponentFixture<RequestLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
