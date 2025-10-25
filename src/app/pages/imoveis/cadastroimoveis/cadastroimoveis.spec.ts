import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cadastroimoveis } from './cadastroimoveis';

describe('Cadastroimoveis', () => {
  let component: Cadastroimoveis;
  let fixture: ComponentFixture<Cadastroimoveis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cadastroimoveis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cadastroimoveis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
