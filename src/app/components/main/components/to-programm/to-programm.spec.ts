import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToProgramm } from './to-programm';

describe('ToProgramm', () => {
  let component: ToProgramm;
  let fixture: ComponentFixture<ToProgramm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToProgramm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToProgramm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
