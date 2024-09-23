import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pag-sports',
  standalone: true,
  imports: [RouterModule, FlexLayoutModule],
  templateUrl: './pag-sports.component.html',
  styleUrl: './pag-sports.component.scss'
})
export class PagSportsComponent {

}
