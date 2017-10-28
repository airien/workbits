import {Http} from '@angular/http';
import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class StringsService {

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {

    }

    get() {
        return this.http.get(this.baseUrl + 'api/Strings/')
            .map((result) => result.json() as String);
  }
  reverse(str: string) {
      return this.http.get(this.baseUrl + 'api/Strings/'+str)
          .map((result) => result.json() as String);
  }
}