import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagSportsComponent } from './pag-sports.component';

describe('PagSportsComponent', () => {
  let component: PagSportsComponent;
  let fixture: ComponentFixture<PagSportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagSportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagSportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
