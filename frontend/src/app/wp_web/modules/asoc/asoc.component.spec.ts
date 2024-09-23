import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsocComponent } from './asoc.component';

describe('AsocComponent', () => {
  let component: AsocComponent;
  let fixture: ComponentFixture<AsocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
