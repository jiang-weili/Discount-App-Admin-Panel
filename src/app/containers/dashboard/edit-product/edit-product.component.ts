import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ApplicationService } from '../../../services/application.service';
import { AuthService } from '../../../services/auth.service';
import { BackWithoutSaveAlertModalComponent } from '../modals/back-without-save-alert-modal/back-without-save-alert-modal.component';
import { environment as env } from '../../../../environments/environment';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditProductComponent implements OnInit {
  /* Initial Variables */
  title = '';
  @Input() mode: 'as-modal';
  @Input() productInput = null;
  product = {};
  categories = [];
  stores = [];

  /* Setting Variables */
  imageUploadUrl = "api/Upload/Image";
  imageDBUrl = env.apiURL + "images/";
  addNewProduct = false;
  loading = false;
  isFormValid = true;
  submitted = false;

  constructor(
    private api: ApplicationService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private httpClient: HttpClient,
    private http: Http,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.title = this.productInput ? 'Edit product' : 'Add New Product';
    this.product = this.productInput ? _.cloneDeep(this.productInput) : {};
    this.addNewProduct = !this.productInput;
    this.imageUploadUrl = env.apiURL + "api/Upload/Image/";

    this.api.list('/api/store/all', 0, data => {
      this.stores = data;
      this.validateForm();
    });

    this.api.list('/api/category/all', 0, data => {
      this.categories = data;
      if (this.addNewProduct === true) {
        this.product['product']['isActive'] = true;
      }
      this.validateForm();
      this.loading = false;
    });
  }

  uploadImage(files: File[]) {
    this.product['icon'] = "e90873ea-9311-474f-a742-144812faa146.png";

    // this.loading = true;
    // this.api.uploadFile(imageUploadUrl, files[0], data => {
    //   this.product['icon'] = data;
    //   this.loading = false;
    // });
  }

  validateForm() {
    if (this.product['product']['name'] != undefined && this.product['product']['name'] != null &&
      this.product['product']['description'] != undefined && this.product['product']['description'] != null &&
      this.product['product']['price'] != undefined && this.product['product']['price'] != null &&
      this.product['product']['sellingPrice'] != undefined && this.product['product']['sellingPrice'] != null &&
      this.product['product']['categoryId'] != undefined && this.product['product']['categoryId'] != null &&
      this.product['product']['storeId'] != undefined && this.product['product']['storeId'] != null &&
      this.product['product']['unitsInStock'] != undefined && this.product['product']['unitsInStock'] != null)
    {
      this.isFormValid = true;
    } else {
      this.isFormValid = false;
    }

    return this.isFormValid;
  }

  onActiveProduct(e) {
    this.product['isActive'] = e.target.checked;
  }

  save() {
    this.submitted = true;
    if (this.validateForm() === false) return;
    this.activeModal.close(this.product);
  }
}
