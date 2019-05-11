import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-look-book-store',
  templateUrl: './look-book-store.component.html',
  styleUrls: ['./look-book-store.component.scss']
})
export class LookBookStoreComponent implements OnInit {
  @Input() title: '';
  @Input() products: [];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
