import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IRequest } from './request';
import { catchError, max } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  RequestData: any=[];
  dataSource = new MatTableDataSource<IRequest>(this.RequestData)
  _url = 'http://localhost:3000/request';

 public maxcmt = 0
 public dt = new Date();
  public dt1 = this.dt.toLocaleString();
 
  constructor(private http: HttpClient) { }

  //AddElement(userData: any) {
  //  return this.http.post<any>(this._url, userData);
 // }

  getRequest() : Observable<IRequest[]> 
    {
      const httpHeaders = new HttpHeaders();
      httpHeaders.append('content-type','application/json');
    //httpHeaders.append('content-type','IRequest');
      return this.http.get<IRequest[]>(this._url,{headers: httpHeaders})
                      .pipe(catchError(this.errorHandler));
    }

    Addelement(addobject : IRequest){
      console.log("added sucessfully")
      const httpHeaders = new HttpHeaders();
      httpHeaders.append('content-type','application/json');
      return this.http.post<any>(this._url ,addobject , {headers: httpHeaders})
                         .pipe(catchError(this.errorHandler));
       
      } 


    Delelement(id:any) {
      const upd_url = 'http://localhost:3000/request' + id;
       const httpHeaders = new HttpHeaders();
       httpHeaders.append('content-type','application/json');
       return this.http.delete(upd_url);
    }

    Updelement( id:any ,updobject : IRequest)
    {
   
    const upd_url = 'http://localhost:3000/request/' + id;
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type','application/json');
    return this.http.put<any>(upd_url,updobject , {headers: httpHeaders});
        //    .pipe(catchError(this.errorHandler));
                                   
   }  
    errorHandler (error: HttpErrorResponse)
  {
      return throwError(error.message || 'xxxxx sServer Error') ;
  }

  updateJson(updateRequest: any){
    var newformdata = { 
      id:updateRequest.id,
      DeveloperName : updateRequest.DeveloperName,
      Type : updateRequest.Type,
      SubmissionDate : updateRequest.SubmissionDate,
      CompletionDate : updateRequest.CompletionDate,
      status : updateRequest.status,
      Assignee:updateRequest.Assignee,
      Input_file : updateRequest.Input_file,
      comment:[''],
      CommentDate:['']
    } ;

    this.getRequest()
    .subscribe(data =>
       {this.RequestData = data;
        this.dataSource.data = this.RequestData
       for(let i=0; i<this.RequestData.length;i++)
          { console.log("this.RequestData[i].id",this.RequestData[i].id)
            console.log("updateRequest.id",updateRequest.id)
      
             if(this.RequestData[i].id==updateRequest.id)
             {
             for(let j= 0;j<this.RequestData[i].comment.length ;j++)
                { 
                  console.log("this.RequestData[i].comment[j].Comment_Date",this.RequestData[i].comment[j].Comment_Date)
              //   newformdata.comment[j].Comment_Date =this.RequestData[i].comment[j].Comment_Date
                  newformdata.comment[j]=this.RequestData[i].comment[j]
                  newformdata.CommentDate[j]=this.RequestData[i].CommentDate[j]
                  this.maxcmt = j
                //  if (j = this.RequestData[i].comment.length - 1 )
                   
               //   newformdata.comment[1].Comment_Date= Date().toLocaleString(); 
                }
                 newformdata.comment[this.maxcmt +1 ] = updateRequest.comment
                 newformdata.CommentDate[this.maxcmt +1 ] = this.dt1
                console.log("newformdata",newformdata.comment)
                
                
                break;
                
              }
         
          }
          this.Updelement(newformdata.id,newformdata).subscribe(data=>{
            console.log("update successful")
             
             });

        });
  }    
}
