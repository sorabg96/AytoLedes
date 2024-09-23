import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagServMuniComponent } from './pag-serv-muni.component';

describe('PagServMuniComponent', () => {
  let component: PagServMuniComponent;
  let fixture: ComponentFixture<PagServMuniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagServMuniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagServMuniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
