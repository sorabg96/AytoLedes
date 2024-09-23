import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMunicipalCorporationComponent } from './create-municipal-corporation.component';

describe('CreateMunicipalCorporationComponent', () => {
  let component: CreateMunicipalCorporationComponent;
  let fixture: ComponentFixture<CreateMunicipalCorporationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMunicipalCorporationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMunicipalCorporationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
