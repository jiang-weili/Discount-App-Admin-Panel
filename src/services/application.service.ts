import {Injectable} from '@angular/core';
import {HelperService} from './helper.service';
import {delay, filter, map} from 'rxjs/operators';

const MOCK_API_DELAY = 1000;

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private helper: HelperService) {
  }

  /**
   * gets the applications
   * @returns  the applications data
   */
  get() {
    return this.helper.get('/assets/data/db.json').pipe(delay(MOCK_API_DELAY));
  }

  getAllUsers(pageSize: number, pageNumber: number = 0) {

    return this.helper.get('/assets/data/GetAllUsers.json').pipe(delay(MOCK_API_DELAY))
      .pipe(map(ret => ({
        data: ret.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize),
        totalElements: ret.length,
        pageSize: pageSize,
        pageNumber: pageNumber
      })));
  }

  getAllProducts(pageSize: number, pageNumber: number = 0) {
    return this.helper.get('/assets/data/GetAllProductsData.json').pipe(delay(MOCK_API_DELAY))
      .pipe(map(ret => ({
        data: ret.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize),
        totalElements: ret.length,
        pageSize: pageSize,
        pageNumber: pageNumber
      })));
  }

  getProducts() {
    return this.helper.get('/assets/data/GetAllProductsData.json').pipe(delay(MOCK_API_DELAY));
  }

  getAllCategories() {
    return this.helper.get('/assets/data/GetCategories.json').pipe(delay(MOCK_API_DELAY));
  }

  getAllStyles() {
    return this.helper.get('/assets/data/GetStyles.json').pipe(delay(MOCK_API_DELAY));
  }

  getAllTypes() {
    return this.helper.get('/assets/data/GetTypes.json').pipe(delay(MOCK_API_DELAY));
  }

  getAllStoreCenterData() {
    return this.helper.get('/assets/data/GetStoreCenterData.json').pipe(delay(MOCK_API_DELAY));
  }

  getDashboardCenterData() {
    return this.helper.get('/assets/data/GetReliabilityCenterData.json').pipe(delay(MOCK_API_DELAY));
  }
}
