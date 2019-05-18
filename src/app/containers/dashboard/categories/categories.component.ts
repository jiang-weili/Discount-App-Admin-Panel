import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationService } from '../../../services/application.service';
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

  constructor(private api: ApplicationService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.loading = true;
    this.api.list('api/category/all', 0, data => {
      this.categories = data;
      this.loading = false;
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
        this.api.store('api/category', ret, data => {
          this.getAllCategories();
        });
      } else {
        this.loading = true;
        var submit_data = {
          'Id': ret.id,
          'Name': ret.name,
          'Description': ret.description
        };
        let editIndex = this.categories.indexOf(item);
        this.api.update('api/category', submit_data, data => {
          this.categories.splice(editIndex, 1, ret);
          this.loading = false;
        });
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
        this.loading = true;
        var selectedCategories = this.categories.filter(item => item.selected);
        selectedCategories.forEach(category => {
          this.api.delete('api/category/' + category.id, cb => { });
        });
        this.getAllCategories();
      }
    }, () => {
    });
  }
}
