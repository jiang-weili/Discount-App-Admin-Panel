import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-edit-store',
  templateUrl: './add-edit-store.component.html',
  styleUrls: ['./add-edit-store.component.scss']
})
export class AddEditStoreComponent implements OnInit {
  form: FormGroup;
  @Input() data: any = {};
  @Input() type: '';
  @Input() title: '';
  submitted = false;
  image: any;
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.setGroupData(this.data);
    this.image = this.form.controls['image'].value;
    console.log('image', this.image);
    console.log('form', this.form.controls['image']);
  }

  /**
   * Validate project
   * @param name - field name
   * @returns - valid or not
   */
  validation(name): any {
    return this.submitted && this.form.controls[name] && this.form.controls[name].errors && this.form.controls[name].errors.required;
  }

  uploadImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (e) => { // called once readAsDataURL is completed
        this.image = e.target['result'];
        this.form.controls['image'] = this.image;
      };
    }
  }
  /**
   * get form controllers
   */
  get f() {
    return this.form.controls;
  }

  setGroupData(data) {
    this.data = data;
    this.form = this.formBuilder.group({
      image: [data.image, Validators.required],
      name: [data.name, Validators.required],
      location: [data.location, Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log("form", this.form.controls);
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    const data = {
      image: this.form.controls.image,
      name: this.form.controls.name.value,
      location: this.form.controls.location.value
    };
    this.activeModal.close({type: 'save', data: data});
  }
}
