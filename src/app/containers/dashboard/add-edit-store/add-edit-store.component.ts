import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ApplicationService } from '../../../services/application.service';
import { AuthService } from '../../../services/auth.service';
import { BackWithoutSaveAlertModalComponent } from '../modals/back-without-save-alert-modal/back-without-save-alert-modal.component';
import { environment as env } from '../../../../environments/environment';


import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone, } from '@angular/core';
import { FormControl } from '@angular/forms';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';

@Component({
  selector: 'app-add-edit-store',
  templateUrl: './add-edit-store.component.html',
  styleUrls: ['./add-edit-store.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditStoreComponent implements OnInit {
  title = '';
  @Input() mode: 'as-modal';
  @Input() storeInput = null;
  imageUploadUrl = "";
  imageDBUrl = "images/";
  store = {};
  categories = [];
  stores = [];
  addNewStore = false;
  loading = false;
  isFormValid = true;
  submitted = false;

  /// Location for Store
  @ViewChild('places') places: GooglePlaceDirective;
  @ViewChild('places2') places2: GooglePlaceDirective;
  @ViewChild('search' ) public searchElement: ElementRef;
  @ViewChild('search2' ) public searchElement2: ElementRef;

  showLocationForm = false;
  workOnEditLocationForm = false;
  location_name: string;
  location_description: string;
  addLocationNameErrorMsg = "Name is required";
  addLocationDescriptionErrorMsg = "Description is required";
  editIndex = 0;
  editLocationName = "";
  editLocationDescription = "";
  editLocationLat: number;
  editLocationLng: number;

  lat: number = 39.90419989999999;
  lng: number = 116.40739630000007;

  constructor(
    private api: ApplicationService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private httpClient: HttpClient,
    private http: Http,
    private authService: AuthService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.loading = true;
    this.title = this.storeInput ? 'Edit Store' : 'Add New Store';
    this.store = this.storeInput ? _.cloneDeep(this.storeInput) : {};
    this.addNewStore = !this.storeInput;
    this.imageUploadUrl = env.apiURL + "api/Upload/Image/";
    this.imageDBUrl = env.apiURL + this.imageDBUrl;

    this.initLocationForm();

    this.api.list('/api/category/all', 0, data => {
      this.categories = data;
      this.validateForm();
      this.loading = false;
    });

    if (this.addNewStore) {
      this.store['location'] = [];

      /// should be removed
      this.store['icon'] = "c7a65ad1-e4d2-4544-a213-0d40a25f7cf0.png";
      this.store['banner'] = "dd5f75b5-cb08-40d7-b767-ede6fb459554.jpg";
    }
  }

  handleAddressChange(address: Address) {
      this.lng = address.geometry.location.lng();
      this.lat  = address.geometry.location.lat();
  }

  handleAddressChange2(address: Address) {
      this.editLocationLng = address.geometry.location.lng();
      this.editLocationLat  = address.geometry.location.lat();
  }

  uploadImage(files: File[], type: any) {
    this.store['icon'] = "c6848291-733b-4c1f-9cd4-e859827e91cd.png";
    this.store['banner'] = "dd5f75b5-cb08-40d7-b767-ede6fb459554.jpg";

    // this.loading = true;
    // this.api.uploadFile('api/Upload/Image/', files[0], data => {
    //   if (type == "banner") {
    //     console.log('banner');
    //     this.store['banner'] = data;
    //   } else {
    //     console.log('icon');
    //     this.store['icon'] = data;
    //   }
    //   this.loading = false;
    // });
  }

  validateForm() {
    if (this.store['name'] != undefined && this.store['name'] != null &&
      this.store['description'] != undefined && this.store['description'] != null &&
      this.store['slogan'] != undefined && this.store['slogan'] != null &&
      this.store['saleDetails'] != undefined && this.store['saleDetails'] != null &&
      this.store['categoryId'] != undefined && this.store['categoryId'] != null)
    {
      this.isFormValid = true;
    } else {
      this.isFormValid = false;
    }

    return this.isFormValid;
  }

  backWithoutSave() {
    if (JSON.stringify(this.store) !== JSON.stringify(this.storeInput)) {
      this.modalService.open(BackWithoutSaveAlertModalComponent, { centered: true }).result.then(ret => {
        if (ret === 'leave') {
          this.activeModal.dismiss('back');
        }
      }, () => { });
    } else {
      this.activeModal.dismiss('back');
    }
  }

  changeShowMode(e) {
    this.showLocationForm = e.target.checked;
  }

  addLocationToStore() {
    if (this.location_name === '' || this.location_description == '') {
      if (this.location_name === "") {
        this.addLocationNameErrorMsg = "Name is required";
      }
      if (this.location_description === "") {
        this.addLocationDescriptionErrorMsg = "Description is required";
      }
      return;
    }

    this.store['location'].push({
      'name': this.location_name,
      'description': this.location_description,
      'longitude': this.lng,
      'latitude': this.lat
    });
    this.showLocationForm = false;
  }

  openEditLocationForm(index) {
    this.editIndex = index;
    this.editLocationName = this.store['location'][index].name;
    this.editLocationDescription = this.store['location'][index].description;
    this.editLocationLat = this.store['location'][index].latitude;
    this.editLocationLng = this.store['location'][index].longitude;

    this.workOnEditLocationForm = true;
  }

  updateLocation() {
    this.store['location'][this.editIndex].name = this.editLocationName;
    this.store['location'][this.editIndex].description = this.editLocationDescription;
    this.store['location'][this.editIndex].latitude = this.editLocationLat;
    this.store['location'][this.editIndex].longitude = this.editLocationLng;

    this.workOnEditLocationForm = false;
  }

  initLocationForm() {
    this.location_name = '';
    this.location_description = '';
  }

  removeLocation(index) {
    if (this.workOnEditLocationForm) return;
    this.store['location'].splice(index, 1);
  }

  save() {
    this.submitted = true;
    if (this.validateForm() === false) return;
    this.activeModal.close(this.store);
  }
}
