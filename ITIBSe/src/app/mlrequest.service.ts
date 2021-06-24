import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IMRequest } from './request';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MLRequestService {

  private _url= "http://localhost:3000/Master-Request"

  constructor(private http:HttpClient) { }

  getMLReq(): Observable<IMRequest[]>{
   const httpHeaders = new HttpHeaders();
   httpHeaders.append('content-type','application/json');
   return this.http.get<IMRequest[]>(this._url,{headers:httpHeaders})
                      .pipe(catchError(this.errorHandler))
  }

    addMLReq(addobject: IMRequest) 
    {
      console.log("check data",addobject)
      //addobject.id = 1
      const httpHeaders = new HttpHeaders();
      httpHeaders.append('content-type','application/json');
      return this.http.post<any>(this._url,addobject, {headers:httpHeaders});
    }
    DeleteMLReq(id:any){
      const upd_url = 'http://localhost:3000/Master-Request' + id;
      const httpHeaders = new HttpHeaders();
      httpHeaders.append('content-type','application/json');
      return this.http.delete(upd_url);
    }

    errorHandler (error: HttpErrorResponse)
     {
        return throwError(error.message || 'Server Error') ;
     } 
}
  
  
