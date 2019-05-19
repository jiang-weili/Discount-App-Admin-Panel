import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation, Input, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ApplicationService } from '../../../services/application.service';

import { AddEditStoreComponent } from '../add-edit-store/add-edit-store.component';
import { DeleteAlertModalComponent } from '../modals/delete-alert-modal/delete-alert-modal.component';

import * as $ from 'jquery';
window['$'] = window['jQuery'] = $;

const PAGE_SIZE = 10;
@Component({
  selector: 'app-all-stores',
  templateUrl: './all-stores.component.html',
  styleUrls: ['./all-stores.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AllStoresComponent implements OnInit {
  loading = true;
  baseUriPfx = "api/store/all";
  allStores = [];
  allStoresList = [];
  @Input() asModal = false;

  constructor(
    private api: ApplicationService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
      this.getAllStores();
  }

  getAllStores() {
    this.loading = true;
    this.allStores = [];
    this.allStoresList = [];
    this.api.list(this.baseUriPfx, 0, data => {
      this.allStores = data;
      this.allStoresList = this.allStores;
      this.jQueryLibraryInit();
      this.loading = false;
    });
  }

  addOrEditStore(store: Object = null) {
    const modalRef = this.modalService.open(AddEditStoreComponent, {
        centered: true,
        size: 'lg',
        windowClass: 'medium-screen-modal-window',
    });
    modalRef.componentInstance.storeInput = store;
    // modalRef.componentInstance.mode = store ? 'full-screen' : 'as-modal';
    modalRef.componentInstance.mode = 'as-modal';

    modalRef.result.then(ret => {
      if (!store) {
        var submit_data = {
          'Name': ret.name,
          'Description': ret.description,
          'Icon': ret.icon,
          'Banner': ret.banner,
          'Slogan': ret.slogan,
          'SaleDetails': ret.saleDetails,
          'location': ret.location,
          'categoryId': ret.categoryId
        };
        this.loading = true;
        this.api.store('api/store', submit_data, data => {
          this.allStores.push(data);
          this.loading = false;
        });
      } else {
        this.loading = true;
        var update_data = {
          'Id': ret.id,
          'Name': ret.name,
          'Description': ret.description,
          'Icon': ret.icon,
          ...ret
        };
        let editIndex = this.allStores.indexOf(store);

        this.api.update('api/store', update_data, data => {
          this.allStores.splice(editIndex, 1, data);
          this.loading = false;
        });
      }
    }, () => { });
  }

  deleteStore(store) {
    const modalRef = this.modalService.open(DeleteAlertModalComponent, { centered: true });
    modalRef.componentInstance.deleteItemName = 'stores';
    modalRef.result.then(ret => {
      if (ret === 'delete') {
        this.loading = true;
        let deleteIndex = this.allStores.indexOf(store);

        this.api.delete('api/store/' + store.id, cb => {
          this.allStores.splice(deleteIndex, 1);
          this.loading = false;
        });
      }
    }, () => { });
  }

  jQueryLibraryInit() {
    const jquery1 = document.createElement('script');
    jquery1.type = 'text/javascript';
    jquery1.src = 'https://code.jquery.com/jquery-3.3.1.js';
    this.elementRef.nativeElement.appendChild(jquery1);

    const jquery2 = document.createElement('script');
    jquery2.type = 'text/javascript';
    jquery2.src = 'https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js';
    this.elementRef.nativeElement.appendChild(jquery2);

    const jquery3 = document.createElement('script');
    jquery3.type = 'text/javascript';
    jquery3.src = 'https://cdn.datatables.net/buttons/1.5.6/js/dataTables.buttons.min.js';
    this.elementRef.nativeElement.appendChild(jquery3);

    const jquery4 = document.createElement('script');
    jquery4.type = 'text/javascript';
    jquery4.src = 'https://cdn.datatables.net/buttons/1.5.6/js/buttons.flash.min.js';
    this.elementRef.nativeElement.appendChild(jquery4);

    const jquery5 = document.createElement('script');
    jquery5.type = 'text/javascript';
    jquery5.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js';
    this.elementRef.nativeElement.appendChild(jquery5);

    const jquery6 = document.createElement('script');
    jquery6.type = 'text/javascript';
    jquery6.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js';
    this.elementRef.nativeElement.appendChild(jquery6);

    const jquery7 = document.createElement('script');
    jquery7.type = 'text/javascript';
    jquery7.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js';
    this.elementRef.nativeElement.appendChild(jquery7);

    const jquery8 = document.createElement('script');
    jquery8.type = 'text/javascript';
    jquery8.src = 'https://cdn.datatables.net/buttons/1.5.6/js/buttons.html5.min.js';
    this.elementRef.nativeElement.appendChild(jquery8);

    const jquery9 = document.createElement('script');
    jquery9.type = 'text/javascript';
    jquery9.src = 'https://cdn.datatables.net/buttons/1.5.6/js/buttons.print.min.js';
    this.elementRef.nativeElement.appendChild(jquery9);

    const jquery10 = document.createElement('script');
    jquery10.type = 'text/javascript';
    jquery10.src = 'https://cdn.datatables.net/buttons/1.5.6/js/buttons.colVis.min.js';
    this.elementRef.nativeElement.appendChild(jquery10);

    const jquery11 = document.createElement('script');
    jquery11.type = 'text/javascript';
    jquery11.src = './assets/js/datatable.js';
    this.elementRef.nativeElement.appendChild(jquery11);
  }
}
