import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSlider1Component } from './post-slider1.component';

describe('PostSlider1Component', () => {
  let component: PostSlider1Component;
  let fixture: ComponentFixture<PostSlider1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostSlider1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostSlider1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
