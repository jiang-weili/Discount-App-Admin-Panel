import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationService } from '../../../../services/application.service';
import { DeleteAlertModalComponent } from '../modals/delete-alert-modal/delete-alert-modal.component';
import { AddEditItemComponent } from '../modals/add-edit-item/add-edit-item.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CategoriesComponent implements OnInit {
  loading = false;
  categories: Array<any> = [];

  constructor(private appSvc: ApplicationService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.loading = true;
    this.appSvc.getAllCategories().subscribe(data => {
      this.loading = false;
      this.categories = data;
    });
  }

  getCategoriesSelectedCount() {
    return this.categories.filter(item => item.selected).length;
  }

  addNewCategory(item: Object = null) {
    const modalRef = this.modalService.open(AddEditItemComponent, {centered: true});
    let title = item ? 'Edit ' : 'Add New ';
    title = title + 'Category';
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.data = item;
    modalRef.componentInstance.disableDelete = true;
    modalRef.result.then(ret => {
      if (!item) {
        this.categories.push(ret);
      }
    }, () => {
    });
  }

  editSelectedCategory() {
    const selectedItems = this.categories.filter(item => item.selected);
    if (selectedItems.length > 0) {
      this.addNewCategory(selectedItems[0]);
    }
  }

  deleteCategory() {
    const modalRef = this.modalService.open(DeleteAlertModalComponent, {centered: true});
    modalRef.componentInstance.deleteItemName = 'selected categories';
    modalRef.result.then(ret => {
      if (ret === 'delete') {
        this.categories = this.categories.filter(item => !item.selected);
      }
    }, () => {
    });
  }
}
