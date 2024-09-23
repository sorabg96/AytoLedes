import { Routes } from '@angular/router';
import { AdminComponent } from './wp_admin/admin/admin.component';
import { DashboardComponent } from './wp_admin/modules/dashboard/dashboard.component';
import { WebComponent } from './wp_web/web/web.component';
import { HomeComponent } from './wp_web/modules/home/home.component';
import { PagAsocComponent } from './wp_admin/modules/pag-asoc/pag-asoc.component';
import { PagAyunComponent } from './wp_admin/modules/pag-ayun/pag-ayun.component';
import { PagHomeComponent } from './wp_admin/modules/pag-home/pag-home.component';
import { PagOtroservComponent } from './wp_admin/modules/pag-otroserv/pag-otroserv.component';
import { PagServMuniComponent } from './wp_admin/modules/pag-serv-muni/pag-serv-muni.component';
import { ServMuniComponent } from './wp_web/modules/serv-muni/serv-muni.component';
import { SedeComponent } from './wp_web/modules/sede/sede.component';
import { OtroservComponent } from './wp_web/modules/otroserv/otroserv.component';
import { AyunComponent } from './wp_web/modules/ayun/ayun.component';
import { AsocComponent } from './wp_web/modules/asoc/asoc.component';
import { UsersComponent } from './wp_admin/modules/users/users.component';
import { CreateUserComponent } from './wp_admin/modules/users/create-user/create-user.component';
import { ReadUserComponent } from './wp_admin/modules/users/read-user/read-user.component';
import { ReadPostsComponent } from './wp_admin/modules/pag-posts/read-posts/read-posts.component';
import { CreatePostsComponent } from './wp_admin/modules/pag-posts/create-posts/create-posts.component';
import { LoginComponent } from './wp_admin/login/login.component';
import { PageNoFoundComponent } from './page-no-found/page-no-found.component';
import { AuthGuard } from './guards/auth.guard';
import { HistoryComponent } from './wp_admin/modules/history/history.component';
import { CreateServMuniComponent } from './wp_admin/modules/pag-serv-muni/create-serv-muni/create-serv-muni.component';
import { ReadServMuniComponent } from './wp_admin/modules/pag-serv-muni/read-serv-muni/read-serv-muni.component';
import { ReadOtroServComponent } from './wp_admin/modules/pag-otroserv/read-otro-serv/read-otro-serv.component';
import { CreateOtroServComponent } from './wp_admin/modules/pag-otroserv/create-otro-serv/create-otro-serv.component';
import { ReadAsocComponent } from './wp_admin/modules/pag-asoc/read-asoc/read-asoc.component';
import { CreateAsocComponent } from './wp_admin/modules/pag-asoc/create-asoc/create-asoc.component';
import { SportsComponent } from './wp_web/modules/sports/sports.component';
import { PagSportsComponent } from './wp_admin/modules/pag-sports/pag-sports.component';
import { ReadSportsComponent } from './wp_admin/modules/pag-sports/read-sports/read-sports.component';
import { CreateSportsComponent } from './wp_admin/modules/pag-sports/create-sports/create-sports.component';
import { CreateMunicipalCorporationComponent } from './wp_admin/modules/pag-ayun/create-municipal-corporation/create-municipal-corporation.component';
import { CreateGreetingsComponent } from './wp_admin/modules/pag-ayun/create-greetings/create-greetings.component';
import { ReadAyunComponent } from './wp_admin/modules/pag-ayun/read-ayun/read-ayun.component';
import { PagPostsComponent } from './wp_admin/modules/pag-posts/pag-posts.component';
import { PostsComponent } from './wp_web/modules/posts/posts.component';
import { CreatePoliticalPartyComponent } from './wp_admin/modules/pag-ayun/create-political-party/create-political-party.component';

export const routes: Routes = [
    {path:"", component:WebComponent, children:[
        {path:"", component:HomeComponent},
        {path:"noticias/:id", component:PostsComponent, pathMatch: 'full'},    
        {path:"inicio", component:HomeComponent},
        {path:"asociaciones", component:AsocComponent},
        {path:"ayuntamiento", component:AyunComponent},
        {path:"otrosServicios", component:OtroservComponent},
        {path:"sede", component:SedeComponent},
        {path:"serviciosMunicipales", component:ServMuniComponent},
        {path:"zonasDeportivasMunicipales", component:SportsComponent},
    ]},
    {path:"wp_admin", redirectTo:"wp_admin/login", pathMatch:"full"},
    {path:"wp_admin", component:AdminComponent, children:[
        {path:"login", component:LoginComponent}, 
        {path:"dashboard", component:DashboardComponent, canActivate:[AuthGuard]},
        {path:"noticias", component:PagPostsComponent, children:[
            {path:"", component:ReadPostsComponent},
            {path:"crear", component:CreatePostsComponent},
            {path:"editar/:id", component:CreatePostsComponent}
        ], canActivate:[AuthGuard]},
        {path:"asociaciones", component:PagAsocComponent, children:[
            {path:"", component:ReadAsocComponent},
            {path:"crear", component:CreateAsocComponent},
            {path:"editar/:id", component:CreateAsocComponent}
        ], canActivate:[AuthGuard]},
        {path:"ayuntamiento", component:PagAyunComponent, children:[
            {path:"", component:ReadAyunComponent},
            {path:"crear_corporacion_municipal", component:CreateMunicipalCorporationComponent},
            {path:"editar_corporacion_municipal/:id", component:CreateMunicipalCorporationComponent},
            {path:"crear_partido_politico", component:CreatePoliticalPartyComponent},
            {path:"editar_partido_politico/:id", component:CreatePoliticalPartyComponent},
            {path:"editar_saludo_alcalde/:id", component:CreateGreetingsComponent}
        ], canActivate:[AuthGuard]},
        {path:"inicio", component:PagHomeComponent, canActivate:[AuthGuard]},
        {path:"otros-servicios", component:PagOtroservComponent, children:[
            {path:"", component:ReadOtroServComponent},
            {path:"crear", component:CreateOtroServComponent},
            {path:"editar/:id", component:CreateOtroServComponent}
        ], canActivate:[AuthGuard]},
        {path:"zonas-deportivas", component:PagSportsComponent, children:[
            {path:"", component:ReadSportsComponent},
            {path:"crear", component:CreateSportsComponent},
            {path:"editar/:id", component:CreateSportsComponent}
        ], canActivate:[AuthGuard]},
        {path:"historial", component: HistoryComponent, canActivate:[AuthGuard]},
        {path:"servicios-municipales", component:PagServMuniComponent, children:[
            {path:"", component:ReadServMuniComponent},
            {path:"crear", component:CreateServMuniComponent},
            {path:"editar/:id", component:CreateServMuniComponent}
        ], canActivate:[AuthGuard]},
        {path:"usuarios", component:UsersComponent, children:[
            {path:"", component:ReadUserComponent},
            {path:"crear", component:CreateUserComponent},
            {path:"editar/:id", component:CreateUserComponent}
        ], canActivate:[AuthGuard]},
    ]},
    {path:"**", component:PageNoFoundComponent}

];
