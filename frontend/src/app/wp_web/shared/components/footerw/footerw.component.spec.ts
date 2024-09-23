import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterwComponent } from './footerw.component';

describe('FooterwComponent', () => {
  let component: FooterwComponent;
  let fixture: ComponentFixture<FooterwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterwComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
