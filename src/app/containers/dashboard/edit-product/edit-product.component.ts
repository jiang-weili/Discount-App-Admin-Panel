import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../../../services/application.service';
import { UserTypeResolverService } from '../../../../services/user-type-resolver.service';
import * as _ from 'lodash';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackWithoutSaveAlertModalComponent } from '../modals/back-without-save-alert-modal/back-without-save-alert-modal.component';

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
  productImagePreview: any;
  product = {};
  categories = [];
  styles = [];
  types = [];
  addNewProduct = false;
  loading = false;
  userType: string;
  isFormValid = true;
  submitted  = false;

  constructor(
    private appSvc: ApplicationService, public activeModal: NgbActiveModal,
    private modalService: NgbModal, private userTypeResolverService: UserTypeResolverService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.title = this.productInput ? 'Edit product' : 'Add New Product';
    this.product = this.productInput ? _.cloneDeep(this.productInput) : {};
    this.addNewProduct = !this.productInput;

    this.appSvc.getAllCategories().subscribe(res => {
      this.categories = res;
    });
    this.appSvc.getAllTypes().subscribe(res => {
      this.types = res;
    });
    this.appSvc.getAllStyles().subscribe(res => {
      this.loading = false;
      this.styles = res;
    });
    this.userType = this.userTypeResolverService.resolve();
    this.validateForm();
  }

  uploadImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (e) => { // called once readAsDataURL is completed
        this.product['image'] = e.target['result'];
      };
    }
  }

  validateForm() {
    this.isFormValid = this.product['image'] && this.product['name'] && this.product['type'] && this.product['style'] && this.product['category'] && this.product['price'];
    return this.isFormValid;
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
    if (this.validateForm()) {
      this.activeModal.close(this.product);
    }
  }
}
