import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
    selector: 'app-posts',
    standalone: true,
    templateUrl: './pag-posts.component.html',
    styleUrl: './pag-posts.component.scss',
    imports: [RouterModule, FlexLayoutModule]
})
export class PagPostsComponent implements OnInit{
  ngOnInit(): void {
  }
  
}
