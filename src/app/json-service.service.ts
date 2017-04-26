import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
@Injectable()
export class JsonService {

  constructor(private _http: Http) { }


  getJSON(url: string): Observable<any> {
    return this._http.get(url)
      .map((response: Response) => <any> response.json())
      .do(data =>  JSON.stringify(data))
      .catch(this.handleError);
  }

  postJSON(url: string, body: Object): Observable<any> { // idpublisher: string, idinfeed: string, desc: string, name: string

    return this._http.post(url, JSON.stringify(body))
    /*.map((response: Response) => <any> response.json())
     .do(data =>  JSON.stringify(data)) // .map(this.extractData)*/
      .catch(this.handleError);
  }

  deleteJSON(url: string, body: Object): Observable<any> { // idpublisher: string, idinfeed: string, desc: string, name: string

    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Methods', '*');

    return this._http.request(url, new RequestOptions({
      body: JSON.stringify(body),
      method: RequestMethod.Delete,
      headers: headers
    }))
    /*.map((response: Response) => <any> response.json())
     .do(data =>  JSON.stringify(data)) // .map(this.extractData)*/
      .catch(this.handleError);
  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
