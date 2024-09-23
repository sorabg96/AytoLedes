import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAyunComponent } from './read-ayun.component';

describe('ReadAyunComponent', () => {
  let component: ReadAyunComponent;
  let fixture: ComponentFixture<ReadAyunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadAyunComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadAyunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
