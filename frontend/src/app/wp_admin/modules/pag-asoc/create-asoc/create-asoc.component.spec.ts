import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAsocComponent } from './create-asoc.component';

describe('CreateAsocComponent', () => {
  let component: CreateAsocComponent;
  let fixture: ComponentFixture<CreateAsocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAsocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAsocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
