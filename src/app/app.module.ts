import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenInterceptor } from './auth/token.interceptor';
import { JwtModule } from "@auth0/angular-jwt";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MaterializeModule } from 'angular2-materialize';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthGuardUsers } from './auth/auth.guard.users';
import { NotAuthGuard } from './auth/not.auth.guard';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersModule } from './users/users.module';
import { OeeModule } from './oee/oee.module';
import { NgPipesModule } from 'ngx-pipes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { CatalogosGeneralesComponent } from './catalogos-generales/catalogos-generales.component';
import { ListByCatalogComponent } from './catalogos-generales/list-by-catalog/list-by-catalog.component';
import { FormularioDetalleComponent } from './catalogos-generales/formulario-detalle/formulario-detalle.component';
import { SecurityComponent } from './security/security.component';
import { RolesComponent } from './security/roles/roles.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'videowall', loadChildren: () => import('./videowall/videowall.module').then(m => m.VideowallModule), canActivate: [AuthGuard] },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: '', component: MenuPrincipalComponent },
      { path: 'usuarios', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
      { path: 'oee', loadChildren: () => import('./oee/oee.module').then(m => m.OeeModule) },
      { path: 'etad', loadChildren: () => import('./etad/etad.module').then(m => m.EtadModule) },
      { path: 'ishikawa', loadChildren: () => import('./ishikawa/ishikawa.module').then(m => m.IshikawaModule) },
      { path: 'seguridad', component: SecurityComponent },
      // { path: 'seguridad/perfil-roles/:id_perfil' ,  component: RolesComponent },
      {
        path: 'catalogos-generales', component: CatalogosGeneralesComponent, canActivate: [AuthGuardUsers],
        data: {
          expectedRole: 54
        }
      },
      {
        path: 'catalogos-generales/:name', component: ListByCatalogComponent, canActivate: [AuthGuardUsers],
        data: {
          expectedRole: 54
        }
      },
      {
        path: 'catalogos-generales/:name/formulario/:id', component: FormularioDetalleComponent, canActivate: [AuthGuardUsers],
        data: {
          expectedRole: 54
        }
      }
    ]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    MenuPrincipalComponent,
    CatalogosGeneralesComponent,
    ListByCatalogComponent,
    FormularioDetalleComponent,
    SecurityComponent,
    RolesComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgPipesModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [''],
        disallowedRoutes: [''],
      },
    })
  ],
  providers: [
    AuthService,
    NotAuthGuard,
    AuthGuardUsers,
    AuthGuard,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]


})
export class AppModule { }
