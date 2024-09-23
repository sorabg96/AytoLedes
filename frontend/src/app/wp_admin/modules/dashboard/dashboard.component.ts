import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import { AreaComponent } from '../../shared/widgets/area/area.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import { CardComponent } from '../../shared/widgets/card/card.component';
import { PieComponent } from '../../shared/widgets/pie/pie.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, MatDividerModule, AreaComponent, FlexLayoutModule,MatCardModule,CardComponent,PieComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
