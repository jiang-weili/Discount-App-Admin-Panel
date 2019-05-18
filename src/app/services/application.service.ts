import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private api: ApiService) { }

  public list(uri, page, cb){
    var params = {
      limit: 10,
      page: 0
    };
    return this.api.get(uri, params).subscribe(cb);
  }

  public store(uri, data, cb) {
    return this.api.post(uri, data).subscribe(cb);
  }

  public uploadFile(uri, file, cb) {
    return this.api.uploadFile(uri, file).subscribe(cb);
  }

  public delete(uri, cb) {
    return this.api.delete(uri).subscribe(cb);
  }

  // getAllUsers(pageSize: number, pageNumber: number = 0) {

  //   return this.helper.get('/assets/data/GetAllUsers.json').pipe(delay(MOCK_API_DELAY))
  //     .pipe(map(ret => ({
  //       data: ret.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize),
  //       totalElements: ret.length,
  //       pageSize: pageSize,
  //       pageNumber: pageNumber
  //     })));
  // }

  // getAllProducts(pageSize: number, pageNumber: number = 0) {
  //   return this.helper.get('/assets/data/GetAllProductsData.json').pipe(delay(MOCK_API_DELAY))
  //     .pipe(map(ret => ({
  //       data: ret.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize),
  //       totalElements: ret.length,
  //       pageSize: pageSize,
  //       pageNumber: pageNumber
  //     })));
  // }

  // getProducts() {
  //   return this.helper.get('/assets/data/GetAllProductsData.json').pipe(delay(MOCK_API_DELAY));
  // }

  // getAllCategories() {
  //   return this.helper.get('/assets/data/GetCategories.json').pipe(delay(MOCK_API_DELAY));
  // }

  // getAllStyles() {
  //   return this.helper.get('/assets/data/GetStyles.json').pipe(delay(MOCK_API_DELAY));
  // }

  // getAllTypes() {
  //   return this.helper.get('/assets/data/GetTypes.json').pipe(delay(MOCK_API_DELAY));
  // }

  // getAllStoreCenterData() {
  //   return this.helper.get('/assets/data/GetStoreCenterData.json').pipe(delay(MOCK_API_DELAY));
  // }

  // getDashboardCenterData() {
  //   return this.helper.get('/assets/data/GetReliabilityCenterData.json').pipe(delay(MOCK_API_DELAY));
  // }
}
