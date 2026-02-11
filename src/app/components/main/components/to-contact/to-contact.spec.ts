import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToContact } from './to-contact';

describe('ToContact', () => {
  let component: ToContact;
  let fixture: ComponentFixture<ToContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToContact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
