import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../../../services/application.service';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { DeleteAlertModalComponent } from '../modals/delete-alert-modal/delete-alert-modal.component';

const PAGE_SIZE = 10;
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AllProductsComponent implements OnInit {
  loading = true;
  allProducts = [];
  allProductsList = [];
  selected = [];
  filterShow = false;
  filterStr = '';
  page = { totalElements: 0, pageNumber: 0, size: PAGE_SIZE };
  @Input() asModal = false;
  tableVisible = false;
  userType: string;

  filterColumns = [
    { prop: 'name', name: 'Name', selected: true },
    { prop: 'type', name: 'Type', selected: true },
    { prop: 'style', name: 'Style', selected: true },
    { prop: 'category', name: 'Category', selected: true },
    { prop: 'price', name: 'Price', selected: true },
  ];

  temp = [];
  constructor(private appSvc: ApplicationService, private modalService: NgbModal, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.appSvc.getAllProducts(this.page.size, this.page.pageNumber).subscribe(res => {
      this.loading = false;
      this.page.totalElements = res.totalElements;
      this.allProductsList = res.data;
      this.allProducts = res.data;
      // make the table relayout, otherwize sometimes its layout is wrong
      setTimeout(() => {
        this.tableVisible = true;
      }, 0);
    });
    this.userType = this.activatedRoute.snapshot.data.userType;
  }
  updateFilter() {
    const strFilter = this.filterStr.trim().toLowerCase();
    let filterItems = this.filterColumns.filter(filterItem => filterItem.selected);
    if (filterItems.length === 0) {
      filterItems = this.filterColumns;
    }
    // filter our data
    this.allProducts = this.allProductsList.filter(product => {
      if (!strFilter) {
        return true;
      }
      return filterItems.some(filterItem => {
        let searchTxt = product[filterItem.prop] || '';
        if (!(product[filterItem.prop] instanceof String)) {
          searchTxt = JSON.stringify(product[filterItem.prop]);
        }
        return searchTxt.toLowerCase().indexOf(strFilter) !== -1;
      });
    });
  }

  addOrEditProduct(product: Object = null) {
    const modalRef = this.modalService.open(EditProductComponent, product ? {
      centered: true,
      backdrop: 'static',
      backdropClass: 'full-screen-modal-backdrop',
      windowClass: 'full-screen-modal-window'
    } : {
        centered: true,
        size: 'lg',
        windowClass: 'medium-screen-modal-window'
      });
    modalRef.componentInstance.productInput = product;
    modalRef.componentInstance.mode = product ? 'full-screen' : 'as-modal';
    modalRef.result.then(ret => {
      // add new product
      if (!product) {
        if (this.allProductsList.length >= this.page.size) {
          this.page.size ++;
        }
        this.allProductsList.push(ret);
      } else {
        let index = this.allProductsList.indexOf(product);
        if (index >= 0) {
          this.allProductsList.splice(index, 1, ret);
        }
        index = this.selected.indexOf(product);
        if (index >= 0) {
          this.selected.splice(index, 1, ret);
        }
      }
      this.updateFilter();
    }, () => { });
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  delete() {
    const modalRef = this.modalService.open(DeleteAlertModalComponent, { centered: true });
    modalRef.componentInstance.deleteItemName = 'products';
    modalRef.result.then(ret => {
      if (ret === 'delete') {
        this.allProductsList = _.difference(this.allProductsList, this.selected);
        this.selected = [];
        this.updateFilter();
      }
    }, () => { });
  }

  setPage($event) {
    this.page.pageNumber = $event.offset;
    this.loading = true;
    this.appSvc.getAllProducts(this.page.size, this.page.pageNumber).subscribe(res => {
      this.loading = false;
      this.page.totalElements = res.totalElements;
      this.allProductsList = res.data;
      this.allProducts = res.data;
      this.selected = [];
      this.updateFilter();
    });
  }
}
