import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagOtroservComponent } from './pag-otroserv.component';

describe('PagOtroservComponent', () => {
  let component: PagOtroservComponent;
  let fixture: ComponentFixture<PagOtroservComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagOtroservComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagOtroservComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
