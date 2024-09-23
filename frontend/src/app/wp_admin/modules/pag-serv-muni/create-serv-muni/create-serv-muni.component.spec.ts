import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServMuniComponent } from './create-serv-muni.component';

describe('CreateServMuniComponent', () => {
  let component: CreateServMuniComponent;
  let fixture: ComponentFixture<CreateServMuniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateServMuniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateServMuniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
