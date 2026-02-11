import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourElements } from './four-elements';

describe('FourElements', () => {
  let component: FourElements;
  let fixture: ComponentFixture<FourElements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourElements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourElements);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
