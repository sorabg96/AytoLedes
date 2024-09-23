import { Component } from '@angular/core';
import { RouterLinkWithHref, RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { FooterwComponent } from "../shared/components/footerw/footerw.component";
import { Headerw2Component } from "../shared/components/headerw2/headerw2.component";
import { SocialMediaComponent } from "../shared/components/social-media/social-media.component";

@Component({
    selector: 'app-web',
    standalone: true,
    templateUrl: './web.component.html',
    styleUrl: './web.component.scss',
    imports: [RouterModule, MatSidenavModule, FlexLayoutModule, CommonModule, FooterwComponent, RouterLinkWithHref, Headerw2Component, SocialMediaComponent]
})
export class WebComponent{
    constructor( private router:RouterModule){}
    
    onClick(event :Event){
        event.preventDefault();
    }
}

