import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OficialesService } from '../services/oficiales.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor( private oficialesService: OficialesService,
               private router: Router ) {

}
  canActivate( ): boolean {

    if ( this.oficialesService.verificarToken() ) {
      if ( this.oficialesService.adminLogueado) {
        return true;
      }
    } else {
      this.router.navigateByUrl('/admin');
      return false;
    }
  }

}
