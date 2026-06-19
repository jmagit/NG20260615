import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { RootViewContainerRefService } from './common-services';
import { ViewContainerRef } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [RootViewContainerRefService, ViewContainerRef, provideRouter([]), ],
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
