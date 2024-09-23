import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagAsocComponent } from './pag-asoc.component';

describe('PagAsocComponent', () => {
  let component: PagAsocComponent;
  let fixture: ComponentFixture<PagAsocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagAsocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagAsocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
