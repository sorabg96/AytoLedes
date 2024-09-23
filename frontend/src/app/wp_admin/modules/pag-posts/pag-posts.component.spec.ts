import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagPostsComponent } from './pag-posts.component';

describe('PostsComponent', () => {
  let component: PagPostsComponent;
  let fixture: ComponentFixture<PagPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
