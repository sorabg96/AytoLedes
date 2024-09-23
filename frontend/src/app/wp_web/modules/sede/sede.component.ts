import { Component } from '@angular/core';
import { FooterwComponent } from "../../shared/components/footerw/footerw.component";

@Component({
    selector: 'app-sede',
    standalone: true,
    templateUrl: './sede.component.html',
    styleUrl: './sede.component.scss',
    imports: [FooterwComponent]
})
export class SedeComponent {

}
