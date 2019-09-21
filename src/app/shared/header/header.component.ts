import { Component, OnInit } from '@angular/core';
import { OficialesService } from '../../services/oficiales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logueado = false;

  constructor( public oficialesService: OficialesService,
               private router: Router) {

               }

  ngOnInit() {
    this.logueado = this.oficialesService.verificarToken();
    this.logueado = this.oficialesService.logueado;
    console.log('logueado:', this.logueado);
  }

  logout() {
    this.logueado = false;
    this.oficialesService.logout();
    this.router.navigateByUrl('/home');
  }

  irReservas() {
        this.router.navigate(['/registrar', sessionStorage.getItem('id')]);
  }
}
