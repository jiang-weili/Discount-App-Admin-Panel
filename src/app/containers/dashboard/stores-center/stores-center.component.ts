import { filter } from 'rxjs/operators';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ApplicationService } from '../../../services/application.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignProductsComponent } from '../modals/assign-products/assign-products.component';
import * as _ from 'lodash';
import { DeleteAlertModalComponent } from '../modals/delete-alert-modal/delete-alert-modal.component';
import { AddEditStoreComponent } from '../modals/add-edit-store/add-edit-store.component';
import { LookBookStoreComponent } from './../modals/look-book-store/look-book-store.component';

@Component({
  selector: 'app-stores-center',
  templateUrl: './stores-center.component.html',
  styleUrls: ['./stores-center.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StoresCenterComponent implements OnInit {
  @ViewChild('outageTable') table: any;
  rows: any = [];
  stores: any = [];
  products: [];
  @Input() title = 'Manage Stores';
  filterStr = '';
  loading = false;
  filterColumns = [
    { prop: 'name', name: 'Name', selected: true },
    { prop: 'type', name: 'Type', selected: true },
    { prop: 'style', name: 'Style', selected: true },
    { prop: 'category', name: 'Category', selected: true },
    { prop: 'price', name: 'Price', selected: true },
  ];

  constructor(private api: ApplicationService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.loading = false;
    // this.api.list('api/store/all', )
    // this.appSvc.getProducts().subscribe(data => {
    //   this.products = data;
    // });
    // this.appSvc.getAllStoreCenterData().subscribe(data => {
    //   this.rows = data;
    //   this.stores = data;
    //   this.loading = false;
    // });
  }

  updateFilter() {
    const strFilter = this.filterStr.trim().toLowerCase();
    let filterItems = [
      { prop: "name" },
      { prop: "location" }
    ];

    // filter our data
    this.rows = this.stores.filter(store => {
      if (!strFilter) {
        return true;
      }
      return filterItems.some(filterItem => {
        let searchTxt = store[filterItem.prop] || '';
        if (!(store[filterItem.prop] instanceof String)) {
          searchTxt = JSON.stringify(store[filterItem.prop]);
        }
        return searchTxt.toLowerCase().indexOf(strFilter) !== -1;
      });
    });
  }

  lookbook(groupIndex, row) {
    const ngbModalRef = this.modalService.open(LookBookStoreComponent, {
      centered: true,
      size: 'sm',
    });
    ngbModalRef.componentInstance.title = "LookBook - " + row.name;
    ngbModalRef.componentInstance.products = row.products;
  }

  deleteGroup(groupIndex) {
    const modalRef = this.modalService.open(DeleteAlertModalComponent, {centered: true});
    modalRef.componentInstance.deleteItemName = " Store";
    modalRef.result.then(ret => {
      if (ret === 'delete') {
        this.rows.splice(groupIndex, 1);
        this.rows = [...this.rows];
      }
    }, () => {
    });
  }

  deleteAll() {
    const modalRef = this.modalService.open(DeleteAlertModalComponent, {centered: true});
    modalRef.componentInstance.deleteItemName = 'all outages';
    modalRef.result.then(ret => {
      if (ret === 'delete') {
        this.rows = [];
      }
    }, () => {
    });
  }

  deleteProduct(groupIndex, row) {
    const modalRef = this.modalService.open(DeleteAlertModalComponent, {centered: true});
    modalRef.componentInstance.message = 'Are you sure to remove the product from store';
    modalRef.result.then(ret => {
      if (ret === 'delete') {
        this.rows[groupIndex].products = _.reject(this.rows[groupIndex].products, {productId: row.productId});
        this.rows = [...this.rows];
      }
    }, () => {
    });
  }

  assignProduct(groupIndex) {
    this.modalService.open(AssignProductsComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'large-screen-modal-window'
    }).result.then(res => {
      if (res instanceof Array) {
        _.each(res, (product, i) => {
          this.rows[groupIndex].products.push(product);
        });
        this.rows[groupIndex].products = [...this.rows[groupIndex].products];
        this.rows = [...this.rows];
      }
    }, () => {
    });
  }

  addNewStore() {
    const ngbModalRef = this.modalService.open(AddEditStoreComponent, {
      centered: true,
      size: 'sm',
    });
    ngbModalRef.componentInstance.title = "Add New Store";
    ngbModalRef.result.then((res: any) => {
      if (res.type === 'save') {
        res.data.items = [];
        this.rows.push(res.data);
        this.rows = [...this.rows];
      }
    }, () => {
    });
  }

  saveEdit(group) {
    this.rows = _.map(this.rows, (row) => {
      if (row.name === group.key) {
        row.edit = false;
        row.image = group.value[0].editImage;
        row.name = group.value[0].editName;
        row.location = group.value[0].editLocation;
      }
      return row;
    });
  }

  edit(groupIndex, group) {
    const ngbModalRef = this.modalService.open(AddEditStoreComponent, {
      centered: true,
      size: 'sm',
    });
    ngbModalRef.componentInstance.title = "Edit Store";
    ngbModalRef.componentInstance.data = {
      image: group.image,
      name: group.name,
      location: group.location,
    };
    ngbModalRef.result.then((res: any) => {
      if (res.type === 'save') {
        this.rows[groupIndex].image = res.data.image;
        this.rows[groupIndex].name = res.data.name;
        this.rows[groupIndex].location = res.data.location;
        this.rows = [...this.rows];
      }
    }, () => {
    });
  }

}
