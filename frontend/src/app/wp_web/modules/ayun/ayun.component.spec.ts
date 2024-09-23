import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyunComponent } from './ayun.component';

describe('AyunComponent', () => {
  let component: AyunComponent;
  let fixture: ComponentFixture<AyunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AyunComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AyunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
