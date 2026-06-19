import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Demos } from './demos';
import { provideRouter } from '@angular/router';

describe('Demos', () => {
  let component: Demos;
  let fixture: ComponentFixture<Demos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([]), ],
      imports: [Demos, ],
    }).compileComponents();

    fixture = TestBed.createComponent(Demos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
