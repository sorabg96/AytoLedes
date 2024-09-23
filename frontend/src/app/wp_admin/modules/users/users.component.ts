import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterModule, FlexLayoutModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  
  ngOnInit(): void {
  }


}
