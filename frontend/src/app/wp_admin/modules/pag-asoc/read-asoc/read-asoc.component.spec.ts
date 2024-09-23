import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAsocComponent } from './read-asoc.component';

describe('ReadAsocComponent', () => {
  let component: ReadAsocComponent;
  let fixture: ComponentFixture<ReadAsocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadAsocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadAsocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
