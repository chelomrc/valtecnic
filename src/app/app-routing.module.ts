import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { OficialesComponent } from './pages/oficiales/oficiales.component';
import { OficialComponent } from './pages/oficial/oficial.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { EditarComponent } from './pages/editar/editar.component';
import { ReservasmesComponent } from './pages/reservasmes/reservasmes.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { PanelComponent } from './pages/panel/panel.component';
import { EntidadesComponent } from './pages/entidades/entidades.component';
import { EntidadComponent } from './pages/entidad/entidad.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  // { path: 'heroes', component: HeroesComponent },
  // { path: 'heroe/:id', component: HeroeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'panel', component: PanelComponent, canActivate: [ AdminGuard ] },
  { path: 'entidades', component: EntidadesComponent, canActivate: [ AdminGuard ] },
  { path: 'entidad/:id', component: EntidadComponent, canActivate: [ AdminGuard ] },
  { path: 'registrar/:id', component: RegistrarComponent, canActivate: [AuthGuard] },
  { path: 'reserva/:id', component: ReservaComponent, canActivate: [ AuthGuard ] },
  { path: 'editar/:gestion/:mes/:id', component: EditarComponent, canActivate: [ AuthGuard ] },
  { path: 'reservas', component: ReservasComponent, canActivate: [ AdminGuard ] },
  // { path: 'reservas/:id', component: ReservasmesComponent, canActivate: [ AdminGuard ] },
  { path: 'reservas/:id', component: ReservasmesComponent },
  { path: 'editarperfil/:id', component: EditarPerfilComponent, canActivate: [ AuthGuard ] },
  { path: 'oficiales', component: OficialesComponent, canActivate: [ AdminGuard ] },
  { path: 'oficial/:id', component: OficialComponent, canActivate: [ AdminGuard ] },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];


@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
