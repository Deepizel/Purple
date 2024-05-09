import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMapperComponent } from './location-mapper.component';

describe('LocationMapperComponent', () => {
  let component: LocationMapperComponent;
  let fixture: ComponentFixture<LocationMapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationMapperComponent]
    });
    fixture = TestBed.createComponent(LocationMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
