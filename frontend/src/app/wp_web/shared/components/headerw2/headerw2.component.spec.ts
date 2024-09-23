import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Headerw2Component } from './headerw2.component';

describe('Headerw2Component', () => {
  let component: Headerw2Component;
  let fixture: ComponentFixture<Headerw2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Headerw2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Headerw2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
