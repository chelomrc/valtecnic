import { Component, OnInit } from '@angular/core';
import { EntidadModel } from '../../models/entidad.model';
import { OficialesService } from '../../services/oficiales.service';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.css']
})
export class EntidadesComponent implements OnInit {

  entidades: EntidadModel [] = [];
  cargando = false;

  constructor( private oficialesService: OficialesService) { }

  ngOnInit() {

    this.cargando = true;
    this.oficialesService.getEntidades()
        .subscribe( resp => {
          // console.log(resp);
          this.entidades = resp;
          this.cargando = false;
        });
  }

  borrarEntidad( i: number) {

    // console.log(this.entidades[i]);
  }

}
