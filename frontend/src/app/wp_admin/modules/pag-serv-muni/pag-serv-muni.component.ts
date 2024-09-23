import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pag-serv-muni',
  standalone: true,
  imports: [RouterModule, FlexLayoutModule],
  templateUrl: './pag-serv-muni.component.html',
  styleUrl: './pag-serv-muni.component.scss'
})
export class PagServMuniComponent implements OnInit{
  ngOnInit(): void {
  }
  
}