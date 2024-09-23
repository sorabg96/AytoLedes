import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGreetingsComponent } from './create-greetings.component';

describe('CreateGreetingsComponent', () => {
  let component: CreateGreetingsComponent;
  let fixture: ComponentFixture<CreateGreetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGreetingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateGreetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
