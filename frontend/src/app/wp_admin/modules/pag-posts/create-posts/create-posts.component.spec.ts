import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostsComponent } from './create-posts.component';

describe('CreateUserComponent', () => {
  let component: CreatePostsComponent;
  let fixture: ComponentFixture<CreatePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
