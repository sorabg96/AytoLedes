import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePoliticalPartyComponent } from './create-political-party.component';

describe('CreatePoliticalPartyComponent', () => {
  let component: CreatePoliticalPartyComponent;
  let fixture: ComponentFixture<CreatePoliticalPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePoliticalPartyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePoliticalPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
