import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadServMuniComponent } from './read-serv-muni.component';

describe('ReadServMuniComponent', () => {
  let component: ReadServMuniComponent;
  let fixture: ComponentFixture<ReadServMuniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadServMuniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadServMuniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
