import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalSectionComponent } from './additional-section.component';

describe('AdditionalSectionComponent', () => {
  let component: AdditionalSectionComponent;
  let fixture: ComponentFixture<AdditionalSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
