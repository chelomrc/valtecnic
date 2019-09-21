
export class ReservaModel {

  id: string;
  fechaReserva: string;
  cantidadAvaluos: string;
  razonSocial: string;
  nit: string;
  celular: string;
  telefono: string;
  direccion: string;
  banco: string;
  oficial: string;
  estado: boolean;
  tipoAvaluo: string;
  fechaCliente: string;
  horaCliente: string;
  latitud: string;
  longitud: string;
  oficialID: string;
  reservaDia: number;
  reservaMes: number;
  reservaYear: number;
  constructor() {
      this.estado = true;
  }

}
