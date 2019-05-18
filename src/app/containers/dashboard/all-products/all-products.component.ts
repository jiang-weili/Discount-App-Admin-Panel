import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ApplicationService } from '../../../services/application.service';

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
  baseUriPfx = "api/product/all";
  allProducts = [];
  allProductsList = [];
  selected = [];
  filterShow = false;
  filterStr = '';
  page = { totalElements: 0, pageNumber: 0, size: PAGE_SIZE };
  @Input() asModal = false;
  tableVisible = false;


  filterColumns = [
    { prop: 'name', name: 'Name', selected: true },
    { prop: 'description', name: 'Description', selected: true },
    { prop: 'category', name: 'Category', selected: true },
    { prop: 'store', name: 'Store', selected: true },
    { prop: 'price', name: 'Price', selected: true },
    { prop: 'sellingPrice', name: 'Selling Price', selected: true },
    { prop: 'unitsInStock', name: 'Units In Stock', selected: true }
  ];

  constructor(private api: ApplicationService, private modalService: NgbModal, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getAllProducts();
  }

  setPage($event) {
    this.page.pageNumber = $event.offset;
    this.loading = true;
    this.getAllProducts();
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
      if (!product) {
        var submit_data = {
          Name: ret['name'],
          Description: ret.description,
          Icon: ret['icon'],
          Price: ret['price'],
          SellingPrice: ret['sellingPrice'],
          UnitsInStock: ret['unitsInStock'],
          IsActive: ret['isActive'],
          StoreId: ret['storeId'],
          CategoryId: ret['categoryId']
        };
        this.api.store('api/product', submit_data, data => {
          this.getAllProducts();
        });
      } else {
        /*
          Update product area
        */

        // let index = this.allProductsList.indexOf(product);
        // if (index >= 0) {
        //   this.allProductsList.splice(index, 1, ret);
        // }
        // index = this.selected.indexOf(product);
        // if (index >= 0) {
        //   this.selected.splice(index, 1, ret);
        // }
      }
      // this.updateFilter();
      // this.getAllProducts(0);
    }, () => { });
  }

  getAllProducts() {
    this.loading = true;
    this.allProducts = [];
    this.allProductsList = [];
    this.api.list(this.baseUriPfx, this.page.pageNumber, data => {
      if (data.result === "Success") {
        data.dataList.forEach(row => {
          this.allProducts.push({
            productId: row.product.id,
            name: row.product.name,
            description: row.product.description,
            price: row.product.price,
            sellingPrice: row.product.price,
            unitsInStock: row.product.unitsInStock,
            category: row.categoryName,
            categoryId: row.categoryId,
            store: row.storeName,
            storeId: row.storeId
          });
        });

        this.allProductsList = this.allProducts;
        this.page.totalElements = this.allProducts.length;

        this.selected = [];

        this.updateFilter();

        setTimeout(() => {
          this.tableVisible = true;
        }, 0);
      }
      this.loading = false;
    });
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
        this.selected.forEach(product => {
          this.api.delete('api/product/' + product.productId);
        });
        this.getAllProducts();
      }
    }, () => { });
  }
}
