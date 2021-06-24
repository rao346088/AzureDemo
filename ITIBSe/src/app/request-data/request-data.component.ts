import { AfterViewInit, ViewChild ,EventEmitter} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IBSEComponent } from '../IBSE/IBSE.component';
import { IRequest } from '../request';
import { RequestService } from '../request.service';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-request-data',
  templateUrl: './request-data.component.html',
  styleUrls: ['./request-data.component.css'],
  outputs:['editrow']
})
export class RequestDataComponent implements OnInit {
   public showcomments=false;
  public editrow = new EventEmitter();
 
  RequestData: any=[];
  displayedColumns= ['id',
                    'DeveloperName', 
                    'Type',
                    'SubmissionDate',
                   // 'CompletionDate',
                    'status',
                    //'Select',
                     //'delete',
                     'Input_file',
                     'Assignee',
                    'Ncomment',
                     'Edit'
                    ]
  dataSource = new MatTableDataSource<IRequest>(this.RequestData)
  Loadid: any;
 
  
  constructor(private  _requestService: RequestService,private route:Router ) { }

    
  @ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(IBSEComponent)
  IBSEformref!: IBSEComponent;

  ngAfterViewInit(){
  
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
 }

  ngOnInit(): void {
        this._requestService.getRequest()
        .subscribe(data => {this.RequestData = data;
        this.dataSource.data = this.RequestData
         });

         console.log("this.RequestData",this.RequestData.Comment);
  }
 
 


  /*DelElement(id: any) {
    // console.log("text1");
     this._requestService.Delelement(id).subscribe((data: any)=>
     {console.log('Deleted succesfully',data)}
     );
     }*/
     

  //  Loadform(a:any ,b:any,c:any,d:any,e:any,f:any,g: any){
  //   console.log("test3")
  //   this.Loadid = a;
  //   this.IBSEformref.RequestForm.patchValue({
  //     DeveloperName : b,
  //     Type : c,
  //     SubmissionDate : d,
  //     CompletionDate : e,
  //     status : f,
  //     Input_file : g,
  //    
  //   });
  //   console.log("test1")
  //   this.route.navigate(['/IBSE/',])
  // } 
  
  
       EditForm(Editdata: String){
  //    console.log("a",a)
    //   this.editrow.emit(Editdata)
      console.log("test1",Editdata)
       this.route.navigate(['/IBSE/',Editdata])
    }
}
