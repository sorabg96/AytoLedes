import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadSportsComponent } from './read-sports.component';

describe('ReadSportsComponent', () => {
  let component: ReadSportsComponent;
  let fixture: ComponentFixture<ReadSportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadSportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadSportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
