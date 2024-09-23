import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtroservComponent } from './otroserv.component';

describe('OtroservComponent', () => {
  let component: OtroservComponent;
  let fixture: ComponentFixture<OtroservComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtroservComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtroservComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
