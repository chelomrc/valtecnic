import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OficialesService } from '../../services/oficiales.service';
import { ReservaModel } from '../../models/reserva.model';

import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  reserva = new ReservaModel();

  constructor( private route: ActivatedRoute,
               private oficialesService: OficialesService ) { }

  ngOnInit() {

    const gestion = this.route.snapshot.paramMap.get('gestion');
    const mes = this.route.snapshot.paramMap.get('mes');
    const id = this.route.snapshot.paramMap.get('id');

    this.oficialesService.getReserva( gestion, mes, id)
        .subscribe( (resp: ReservaModel) => {
          this.reserva = resp;
          this.reserva.id = id;
          // console.log(this.reserva);
        });
  }

  guardar( form: NgForm ) {

    this.oficialesService.actualizarReserva(this.reserva)
      .subscribe( resp => {

      Swal.fire({
        title: 'Reserva Agregada',
        text: 'Se registró correctamente',
        type: 'success'
      });

    });
  }


}
