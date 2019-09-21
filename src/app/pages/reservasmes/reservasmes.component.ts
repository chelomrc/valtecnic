import { Component, OnInit } from '@angular/core';
import { OficialesService } from 'src/app/services/oficiales.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ReservaModel } from 'src/app/models/reserva.model';

@Component({
  selector: 'app-reservasmes',
  templateUrl: './reservasmes.component.html',
  styleUrls: ['./reservasmes.component.css']
})
export class ReservasmesComponent implements OnInit {

  reservas: ReservaModel[] = [];
  reserva: ReservaModel;
  reservasMes: ReservaModel[] = [];
  cargando = false;
  mostrarReserva = false;
  fecha = new Date();
  id: string;

  constructor(private oficialesService: OficialesService,
              private route: ActivatedRoute ) { }

  ngOnInit() {

    this.cargando = true;
    this.id = this.route.snapshot.paramMap.get('id');
    this.crearArreglo();

  }

  crearArreglo() {

    return this.oficialesService.getReservas()
        .subscribe( resp => {
          console.log(resp);
          this.reservas = resp;
          this.cargando = false;
          this.reservasMes = this.oficialesService.crearArregloReservasMesOficial(this.reservas[this.fecha.getMonth()], this.id);
          console.log(this.reservasMes);
        });

  }

  mesAnterior() {

    this.fecha.setMonth( this.fecha.getMonth() - 1 );
    this.cargando = true;
    this.crearArreglo();

  }

  mesSiguiente() {

    this.fecha.setMonth( this.fecha.getMonth() + 1 );
    this.cargando = true;
    this.crearArreglo();

  }

  verReserva( i ) {

    this.mostrarReserva = true;
    this.reserva = this.reservasMes[i];

    console.log(this.reserva);

  }


}
