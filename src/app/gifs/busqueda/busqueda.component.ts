import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor( private gifsService:GifsService) {}

  buscar( ){
    const textoBusqueda = this.txtBuscar.nativeElement.value;
    
    if(textoBusqueda.trim().length === 0) return;
    
    this.gifsService.buscarGifs(textoBusqueda);
    this.txtBuscar.nativeElement.value = "";
     

  }

}
