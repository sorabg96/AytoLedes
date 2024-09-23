import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOtroServComponent } from './create-otro-serv.component';

describe('CreateOtroServComponent', () => {
  let component: CreateOtroServComponent;
  let fixture: ComponentFixture<CreateOtroServComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOtroServComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOtroServComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
