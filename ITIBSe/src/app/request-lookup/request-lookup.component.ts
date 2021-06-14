import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMRequest } from '../request';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MLRequestService } from '../mlrequest.service';



@Component({
  selector: 'app-request-lookup',
  templateUrl: './request-lookup.component.html',
  styleUrls: ['./request-lookup.component.css']
})
export class RequestLookupComponent implements OnInit {

  RequestLookupForm: FormGroup |any;
  RequestLookup:any= [];
  public selectedId: any;
  public maxId = 0
  public MLdup= false;


  get RLType() 
  {
     return this.RequestLookupForm.get('RLType');
  }

  get Name(){
    return this.RequestLookupForm.get('Name');
  }

  displayedColumns= [ 'id','RLType','Name','Delete','Edit'];

  dataSource = new MatTableDataSource<IMRequest>(this.RequestLookup)
  
  constructor(private fb: FormBuilder, private _mlrequestService:MLRequestService) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  MasterList=[{"id" : 1, "RLType" : 'DeveloperName'},
            {"id" : 3, "RLType" : 'RequestType'},
            {"id" : 4, "RLType" : 'status'},
            {"id":5,"RLType":'Assignee'}
          ];
  
  
 
  ngOnInit(): void {

  this.RequestLookupForm = this.fb.group({
    RLType: ['', [Validators.required]],
    Name:['',[Validators.required]]
     });

     this.dataSource.sort = this.sort;
this.dataSource.paginator = this.paginator;

let resp = this._mlrequestService.getMLReq();
this._mlrequestService.getMLReq()
      resp.subscribe(data =>this.dataSource.data = data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filter = this.MasterList[0].RLType.trim().toLowerCase()
  
    this.RequestLookupForm.setValue({
     RLType : this.MasterList[0].RLType,
     Name : ''
     
   });
  }

  onSubmit(){
   this.maxId=0;
   this.MLdup=false;
   for(let i=0; i < this.dataSource.data.length; i++){
     if(this.maxId < this.dataSource.data[i].id)
     {
       this.maxId==this.dataSource.data[i].id
     }
     if(this.dataSource.data[i].RLType==this.RequestLookupForm.value.RLType &&
        this.dataSource.data[i].Name==this.RequestLookupForm.value.Name){
          this.MLdup=true;
        }
      }   
   let loadId=0;
   loadId=this.maxId

   if(this.MLdup==false){
   
    const Form_Data:any=
    {
       id:loadId,
       RLType:this.RequestLookupForm.value.RLType,
      Name:this.RequestLookupForm.value.Name
    }
  this._mlrequestService.addMLReq(this.RequestLookupForm.value).subscribe(data=>{console.log("Added successfully")});
  console.log("test2",this.RequestLookupForm.value)
 }
}


  onSelect(ReqList:any) 
  {
      this.dataSource.filter = ReqList.RLType.trim().toLowerCase()
       

       this.RequestLookupForm.patchValue({
        RLType : ReqList.RLType
        
        
      });
      
      }
   isSelected(ReqList:any) { return ReqList.id === this.selectedId; }

   DelElement(id: any) {
    // console.log("text1");
     this._mlrequestService.DeleteMLReq(id).subscribe((data: any)=>
     {console.log('Deleted succesfully',data)}
     );
     }
}
