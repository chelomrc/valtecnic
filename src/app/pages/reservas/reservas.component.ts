import { Component, OnInit } from '@angular/core';
import { OficialesService } from 'src/app/services/oficiales.service';
import { ReservaModel } from '../../models/reserva.model';
import { EntidadModel } from '../../models/entidad.model';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  reservas: ReservaModel[] = [];
  reservasMes: ReservaModel[] = [];
  reservasMesTodas: ReservaModel[] = [];

  entidades: EntidadModel[] = [];
  reservasEntidad: ReservaModel[] = [];
  cargando = false;
  fecha = new Date();

  constructor(private oficialesService: OficialesService) { }


  ngOnInit() {

    console.log('reservas');
    this.cargando = true;
    this.oficialesService.getReservas()
        .subscribe( resp => {
          console.log(resp);
          this.reservas = resp;
          this.cargando = false;
          this.reservasMes = this.oficialesService.crearArregloReservasMes(this.reservas[this.fecha.getMonth()]);
          this.reservasMesTodas = this.reservasMes;
          this.obtenerEntidades();
          console.log(this.reservasMesTodas);
        });
  }
  mesAnterior() {

    this.fecha.setMonth( this.fecha.getMonth() - 1 );
    this.cargando = true;
    this.oficialesService.getReservas()
        .subscribe( resp => {
          console.log(resp);
          this.reservas = resp;
          this.cargando = false;
          this.reservasMes = this.oficialesService.crearArregloReservasMes(this.reservas[this.fecha.getMonth()]);
          this.reservasMesTodas = this.reservasMes;
          console.log(this.reservasMes);
          console.log( this.fecha.getMonth() );
        });

  }
  mesSiguiente() {

    this.fecha.setMonth( this.fecha.getMonth() + 1 );
    this.cargando = true;
    this.oficialesService.getReservas()
        .subscribe( resp => {
          console.log(resp);
          this.reservas = resp;
          this.cargando = false;
          this.reservasMes = this.oficialesService.crearArregloReservasMes(this.reservas[this.fecha.getMonth()]);
          this.reservasMesTodas = this.reservasMes;
          console.log(this.reservasMes);
          console.log( this.fecha.getMonth() );
        });


  }

  borrarReserva( reserva: ReservaModel, i: number ) {

  }

  filtrarEstado( estado: boolean) {

    this.reservasMes = [];
    for ( const reserva of this.reservasMesTodas ) {
      if ( reserva.estado === estado) {
        this.reservasMes.push(reserva);
      }
    }
  }

  obtenerEntidades() {
    this.oficialesService.getEntidades()
        .subscribe( resp => {
          this.entidades = resp;
          console.log(this.entidades);
        });
  }

  filtrarEntidad( entidad: string) {
    this.reservasMes = [];
    for ( const reserva of this.reservasMesTodas ) {
      if ( reserva.banco === entidad) {
        this.reservasMes.push(reserva);
      }
    }
  }

  filtrarTodas() {
    this.reservasMes = this.reservasMesTodas;
  }




}
