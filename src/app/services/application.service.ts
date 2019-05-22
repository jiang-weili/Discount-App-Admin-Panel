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
      limit: 10000,
      page: page
    };
    return this.api.get(uri, params).subscribe(cb);
  }

  public store(uri, data, cb) {
    return this.api.post(uri, data).subscribe(cb);
  }

  public update(uri, data, cb) {
    return this.api.put(uri, data).subscribe(cb);
  }

  public uploadFile(uri, file, cb) {
    return this.api.uploadFile(uri, file).subscribe(cb);
  }

  public delete(uri, cb) {
    return this.api.delete(uri).subscribe(cb);
  }
}
