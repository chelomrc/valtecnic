import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OficialesService } from '../../services/oficiales.service';
import { OficialModel } from 'src/app/models/oficial.model';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  oficial = new OficialModel();
  cargando = false;


  constructor(private oficialService: OficialesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.cargando = true;
    const id = this.route.snapshot.paramMap.get('id');

    this.oficialService.getOficial( id )
    .subscribe( (resp: OficialModel) => {
      this.oficial = resp;
      this.oficial.id = id;
      this.cargando = false;
      // console.log(resp);
    });
  }

  misReservas() {
    // console.log(this.oficial.id);
    this.router.navigate(['/reservas', this.oficial.id]);
  }

}
