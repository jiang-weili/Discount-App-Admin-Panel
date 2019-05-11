import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assign-products',
  templateUrl: './assign-products.component.html',
  styleUrls: ['./assign-products.component.scss']
})
export class AssignProductsComponent implements OnInit {
  @ViewChild('allProducts') allProductsComponent: TemplateRef<any>;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  save() {
    this.activeModal.close(this.allProductsComponent['selected']);
  }
}
