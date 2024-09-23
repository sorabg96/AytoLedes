import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOtroServComponent } from './read-otro-serv.component';

describe('ReadOtroServComponent', () => {
  let component: ReadOtroServComponent;
  let fixture: ComponentFixture<ReadOtroServComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadOtroServComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadOtroServComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
