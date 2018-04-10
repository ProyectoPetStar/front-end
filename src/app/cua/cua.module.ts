import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { OptionsComponent } from './options/options.component';
import { FormularioMetasComponent } from './formulario-metas/formulario-metas.component';
import { ListaMetasComponent } from './lista-metas/lista-metas.component';
import { AsginacionMetasComponent } from './asginacion-metas/asginacion-metas.component';
import { ListaAsignacionComponent } from './lista-asignacion/lista-asignacion.component';
import { ListaFallasComponent } from './lista-fallas/lista-fallas.component';
import { FormularioFallasComponent } from './formulario-fallas/formulario-fallas.component';
import { ListaProductsComponent } from './lista-products/lista-products.component';
import { FormularioProductoComponent } from './formulario-producto/formulario-producto.component';
import { ListaAsignacionProductoComponent } from './lista-asignacion-producto/lista-asignacion-producto.component';
import { AsignacionProductosComponent } from './asignacion-productos/asignacion-productos.component';
import { ListCatalogsComponent } from './list-catalogs/list-catalogs.component';
import { ListByCatalogComponent } from './list-by-catalog/list-by-catalog.component';
import { FormularioDetalleComponent } from './list-by-catalog/formulario-detalle/formulario-detalle.component';
import { NgPipesModule } from 'ngx-pipes';
import { ListaReportesComponent } from './lista-reportes/lista-reportes.component';
import { RptOeeAmut1Component } from './rpt-oee-amut1/rpt-oee-amut1.component';
import { RptJudoAmut12Component } from './rpt-judo-amut1-2/rpt-judo-amut1-2.component';
import { RptFallasComponent } from './rpt-fallas/rpt-fallas.component';
import { MetaMasivaComponent } from './meta-masiva/meta-masiva.component';



const routesMetas: Routes = [
  { path: 'opciones', component: OptionsComponent },
  { path: 'opciones/metas', component: ListaMetasComponent },
  { path: 'opciones/metas/:id', component: FormularioMetasComponent },
  { path: 'opciones/metas-asignaciones', component: ListaAsignacionComponent },
  { path: 'opciones/metas-asignaciones/:id', component: AsginacionMetasComponent },
  { path: 'opciones/fallas', component: ListaFallasComponent },
  { path: 'opciones/fallas/:id', component: FormularioFallasComponent },
  { path: 'opciones/productos', component: ListaProductsComponent },
  { path: 'opciones/productos/:id', component: FormularioProductoComponent },
  { path: 'opciones/productos-asignaciones', component:  ListaAsignacionProductoComponent},
  /* Carga de metas */
  { path: 'opciones/metas-carga-masiva', component: MetaMasivaComponent },
  /* rutas de catalogos */
  { path: 'opciones/catalogos', component: ListCatalogsComponent},
  { path: 'opciones/catalogos/:name', component: ListByCatalogComponent },
  { path: 'opciones/catalogos/:name/formulario/:id', component: FormularioDetalleComponent },
  /* rutas de reportes */
  { path: 'opciones/lista-reportes', component: ListaReportesComponent},
  { path: 'opciones/lista-reportes/oee-amut-1', component: RptOeeAmut1Component},
  { path: 'opciones/lista-reportes/judo-amut', component: RptJudoAmut12Component},
  { path: 'opciones/lista-reportes/fallas', component: RptFallasComponent}

];

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    ReactiveFormsModule,
    FormsModule,
    NgPipesModule,
    RouterModule.forChild(routesMetas)
  ],
  declarations: [
    OptionsComponent, 
    FormularioMetasComponent, 
    ListaMetasComponent, 
    AsginacionMetasComponent, 
    ListaAsignacionComponent, 
    ListaFallasComponent, 
    FormularioFallasComponent, 
    ListaProductsComponent, 
    FormularioProductoComponent, 
    ListaAsignacionProductoComponent, 
    AsignacionProductosComponent,
    ListCatalogsComponent, 
    ListByCatalogComponent, 
    FormularioDetalleComponent, ListaReportesComponent, RptOeeAmut1Component, RptJudoAmut12Component, RptFallasComponent, MetaMasivaComponent
  ]
})
export class CuaModule { }
