import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { OficialesComponent } from './pages/oficiales/oficiales.component';
import { OficialComponent } from './pages/oficial/oficial.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { DatePipe } from '@angular/common';
import { ReservasComponent } from './pages/reservas/reservas.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AgmCoreModule } from '@agm/core';
import { EditarComponent } from './pages/editar/editar.component';

// cambiar datepipe a español
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ReservasmesComponent } from './pages/reservasmes/reservasmes.component';
import { VerComponent } from './pages/ver/ver.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { AdminComponent } from './pages/admin/admin.component';
import { PanelComponent } from './pages/panel/panel.component';
import { EntidadesComponent } from './pages/entidades/entidades.component';
import { EntidadComponent } from './pages/entidad/entidad.component';
import { FooterComponent } from './shared/footer/footer.component';
registerLocaleData(localeEs);



@NgModule({
  declarations: [
    AppComponent,
    HeroeComponent,
    HeroesComponent,
    OficialesComponent,
    OficialComponent,
    RegistrarComponent,
    EditarPerfilComponent,
    ReservaComponent,
    ReservasComponent,
    EditarComponent,
    ReservasmesComponent,
    VerComponent,
    HomeComponent,
    HeaderComponent,
    AdminComponent,
    PanelComponent,
    EntidadesComponent,
    EntidadComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD0puTfOdlOwVQZIAFZCdZECaMwdX3ENbU'
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
