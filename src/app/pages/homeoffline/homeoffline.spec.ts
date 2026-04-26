import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homeoffline } from './homeoffline';

describe('Homeoffline', () => {
  let component: Homeoffline;
  let fixture: ComponentFixture<Homeoffline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Homeoffline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Homeoffline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
