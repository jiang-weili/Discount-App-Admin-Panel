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
  title = '';
  @Input() mode: 'full-screen' | 'as-modal' = 'full-screen';
  @Input() productInput = null;
  imageBaseUrl = ""
  product = {};
  categories = [];
  stores = [];
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
    this.imageBaseUrl = env.apiURL + "api/Upload/Image/";

    this.api.list('/api/store/all', 0, data => {
      this.stores = data;
      this.validateForm();
    });

    this.api.list('/api/category/all', 0, data => {
      this.categories = data;
      if (this.addNewProduct === true) {
        this.product['isActive'] = true;
      }
      this.validateForm();
      this.loading = false;
    });
  }

  uploadImage(files: File[]) {
      // const reader = new FileReader();
      // reader.onload = () => {
      //   this.product['icon'] = reader.readAsDataUrl(files[0]);
      // }
    this.loading = true;
    this.api.uploadFile('api/Upload/Image/', files[0], data => {
      this.product['icon'] = data;
      this.loading = false;
    });
  }

  validateForm() {
    if (this.product['name'] != undefined && this.product['name'] != null &&
      this.product['description'] != undefined && this.product['description'] != null &&
      this.product['price'] != undefined && this.product['price'] != null &&
      this.product['sellingPrice'] != undefined && this.product['sellingPrice'] != null &&
      this.product['categoryId'] != undefined && this.product['categoryId'] != null && 
      this.product['storeId'] != undefined && this.product['storeId'] != null && 
      this.product['unitsInStock'] != undefined && this.product['unitsInStock'] != null)
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

  backWithoutSave() {
    if (JSON.stringify(this.product) !== JSON.stringify(this.productInput)) {
      this.modalService.open(BackWithoutSaveAlertModalComponent, { centered: true }).result.then(ret => {
        if (ret === 'leave') {
          this.activeModal.dismiss('back');
        }
      }, () => { });
    } else {
      this.activeModal.dismiss('back');
    }
  }

  save() {
    this.submitted = true;
    if (this.validateForm() === false) return;
    this.activeModal.close(this.product);
  }
}
