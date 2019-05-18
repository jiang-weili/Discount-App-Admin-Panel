import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../../services/application.service';
import * as _ from 'lodash';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackWithoutSaveAlertModalComponent } from '../modals/back-without-save-alert-modal/back-without-save-alert-modal.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditUserComponent implements OnInit {
  title = '';
  @Input() mode: 'full-screen' | 'as-modal' = 'full-screen';
  @Input() memberInput = null;
  member = {};
  addNewUser = false;
  loading = false;
  userType: string;
  selectedSkills = [];
  isFormValid = true;
  submitted  = false;
  @ViewChild('avatarInput') avatarInputRef: ElementRef;

  constructor(
    private appSvc: ApplicationService, public activeModal: NgbActiveModal, private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.title = this.memberInput ? 'Edit member' : 'Add new member';
    this.member = this.memberInput ? _.cloneDeep(this.memberInput) : {};
    this.addNewUser = !this.memberInput;
    this.validateForm();
  }

  validateForm() {
    this.isFormValid = this.member['userName'] && this.member['gender'] && this.member['age'] && (this.isEmail(this.member['email'])) && (this.isPhone(this.member['phone']));
    return this.isFormValid;
  }

  isEmail(str) {
    return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(str);
  }

  isPhone(str) {
    return /^\d{1,}$/.test(str);
  }

  backWithoutSave() {
    if (JSON.stringify(this.member) !== JSON.stringify(this.memberInput)) {
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
      this.activeModal.close(this.member);
    }
  }
}
