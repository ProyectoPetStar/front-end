import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { OptionsComponent } from './options/options.component';
import { AuthGuardVideoWall } from '../auth/auth.guard.video.wall';
/* expectedRole: number Es el id del rol que se encuentra en la base de datos */
const routesVideoWall: Routes = [
  {
    path: '', component: OptionsComponent, canActivate: [AuthGuardVideoWall],
    data: {
      expectedRole: 56
    }
  },
  {
    path: 'options', component: OptionsComponent, canActivate: [AuthGuardVideoWall],
    data: {
      expectedRole: 56
    }
  },
  {
    path: 'presentacion', component: PresentacionComponent, canActivate: [AuthGuardVideoWall],
    data: {
      expectedRole: 56
    }
  }
]
@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    RouterModule.forChild(routesVideoWall)
  ],
  providers: [
    AuthGuardVideoWall
  ],
  declarations: [PresentacionComponent, OptionsComponent]
})
export class VideowallModule { }