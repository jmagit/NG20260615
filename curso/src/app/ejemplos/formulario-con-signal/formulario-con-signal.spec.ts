import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioConSignal } from './formulario-con-signal';

describe('FormularioConSignal', () => {
  let component: FormularioConSignal;
  let fixture: ComponentFixture<FormularioConSignal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioConSignal],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioConSignal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
