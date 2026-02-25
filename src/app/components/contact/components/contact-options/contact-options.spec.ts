import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactOptions } from './contact-options';

describe('ContactOptions', () => {
  let component: ContactOptions;
  let fixture: ComponentFixture<ContactOptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactOptions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactOptions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
