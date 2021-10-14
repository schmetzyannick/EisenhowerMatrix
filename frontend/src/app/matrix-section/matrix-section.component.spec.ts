import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixSectionComponent } from './matrix-section.component';

describe('MatrixSectionComponent', () => {
  let component: MatrixSectionComponent;
  let fixture: ComponentFixture<MatrixSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
