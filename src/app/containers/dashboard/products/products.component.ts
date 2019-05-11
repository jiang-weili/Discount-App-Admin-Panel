import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {

  public userType: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userType = this.activatedRoute.snapshot.data.userType;
  }
}
