import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-footerw',
  standalone: true,
  imports: [MatDividerModule, MatIconModule, CommonModule],
  templateUrl: './footerw.component.html',
  styleUrl: './footerw.component.scss'
})
export class FooterwComponent{

}
