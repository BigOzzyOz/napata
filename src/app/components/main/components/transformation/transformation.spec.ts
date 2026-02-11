import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Transformation } from './transformation';

describe('Transformation', () => {
  let component: Transformation;
  let fixture: ComponentFixture<Transformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Transformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Transformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
