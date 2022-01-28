import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  ngOnInit(): void {
    this.btnClass = `btn ${ this.btnClass}`;
  }

  //@Input('valor') progreso: number = 20;
  @Input('valor') progreso: number = 20;
  @Input() btnClass : string = 'btn-primary';

  @Output('valor') valorSalida: EventEmitter <number> = new EventEmitter();

  /*get getPorcentaje() {
    return `${this.progreso}%`;
  }*/

  cambiarValor  (valor: number ) {
    if (this.progreso >= 100 && valor >= 0) {
       this.progreso = 100;       
    } else if (this.progreso <= 0 && valor < 0) {
       this.progreso = 0;
    } else {
      this.progreso = this.progreso + valor;
    }
    this.valorSalida.emit(this.progreso);
  }

  onChange (nuevoValor : number) {
    if ( nuevoValor >= 100 ){
      nuevoValor = 100;
    } else if ( nuevoValor <= 0) {
      nuevoValor = 0;
    } 
    this.valorSalida.emit (nuevoValor);
  }

}
