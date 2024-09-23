import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagAyunComponent } from './pag-ayun.component';

describe('PagAyunComponent', () => {
  let component: PagAyunComponent;
  let fixture: ComponentFixture<PagAyunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagAyunComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagAyunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
