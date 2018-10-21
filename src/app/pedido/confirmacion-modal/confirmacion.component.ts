import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})

export class ConfirmacionComponent implements OnInit {
  @Input() numeroPedido;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

} 
