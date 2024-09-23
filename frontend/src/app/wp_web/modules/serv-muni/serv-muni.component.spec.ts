import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServMuniComponent } from './serv-muni.component';

describe('ServMuniComponent', () => {
  let component: ServMuniComponent;
  let fixture: ComponentFixture<ServMuniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServMuniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServMuniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
