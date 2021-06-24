
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestService } from '../request.service';
import { ActivatedRoute ,ParamMap ,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MLRequestService } from '../mlrequest.service';

//import {Input_fileValidator} from '../shared/Input_file.validator';
//import {map ,filter} from 'rxjs/operators'

@Component({
  selector: 'app-IBSE',
  templateUrl: './IBSE.component.html',
  styleUrls: ['./IBSE.component.css']
})
export class IBSEComponent implements OnInit {

  public Editdata: Observable<{ [Key: string]: String; }> | undefined;
  
  RequestForm: FormGroup |any;
  requestData: any [] = [];
   public MLRData:any[]=[];
   public LTypex:any[] = [];
   public LDeveloperNamex:any[]=[];
   public Lstatusx:any[]=[];
   public LAssigneex:any[]=[];

  public csvRecords:any= [];
  public selectedId:any;
  RequestData:any=[];
  public dt = new Date();
  public dt1 = this.dt.toLocaleString();
 
  get DeveloperName()   
  {
   return this.RequestForm.get('DeveloperName');
  }
  
  get Type() 
  {
   return this.RequestForm.get('Type');
  }

  get SubmissionDate() 
  {
     return this.RequestForm.get('SubmissionDate');
  }
  get CompletionDate() 
  {
     return this.RequestForm.get('CompletionDate');
  }

  get status() 
  {
     return this.RequestForm.get('status');
  }
  get Pcomment(){
    return this.RequestForm.get('Pcomment');
  }
  
  get Ncomment(){
    return this.RequestForm.get('Ncomment');
  }
  get Input_file() {
    return this.RequestForm.get('Input_file');
  }
  
  get FileUpload() {
    return this.RequestForm.get('FileUpload');
  }
  
  get Assignee() {
  return this.RequestForm.get('Assignee');
}

  constructor( private fb: FormBuilder,
               private _requestService: RequestService,
               private _mlrequestService:MLRequestService,
               private route: ActivatedRoute,
               private router:Router) { }

  ngOnInit(): void {

   this.route.paramMap.subscribe((params: ParamMap) => {
    let id = Number(params.get('id'))
    this.selectedId = id;
   });



/*------------ if edit button clicked check selectedId(perticular column) selected to edit---*/
//this.Input_file.setValidators(Validators.required);



console.log("selected Id check",this.selectedId)

  if(this.selectedId > 0){
   
  
  this._requestService.getRequest()
  .subscribe(data => {this.RequestData = data;
     // console.log("requestdta",this.RequestData)
    for(let i=0; i<this.RequestData.length; i++){
      // console.log("selectedid",this.selectedId)
     
      if(this.RequestData[i].id==this.selectedId){
       // console.log("selectedid2",this.RequestData[i])
        this.Loadform(this.RequestData[i])
        
        }
        
      }  
     
  });  
 
} 
        
    this.RequestForm = this.fb.group({
      Input_file:[''],
      DeveloperName: ['',[Validators.required]],
      Type:['',[Validators.required]],
      SubmissionDate: [ this.dt1,[Validators.required]],
      CompletionDate:[''],
      status: ['',[Validators.required]],
      Pcomment: [''],
      Ncomment: [],
      Assignee: ['']

    },{});
   
    let resp = this._mlrequestService.getMLReq();
   this._mlrequestService.getMLReq()
      resp.subscribe(data =>this.MLRData = data);
 }

 get LType()
 {
   
 this.LTypex = this.MLRData.filter( (o) =>
 (o.RLType=="RequestType"))

 return this.LTypex.map( (o) =>
  (o.Name))
 }

 get LDeveloperName()
 {
   
 this.LDeveloperNamex = this.MLRData.filter( (o) =>
 (o.RLType=="DeveloperName"))

 return this.LDeveloperNamex.map( (o) =>
  (o.Name))
 }

 get Lstatus(){
  this.Lstatusx = this.MLRData.filter( (o) =>
  (o.RLType=="Status"))
 
  return this.Lstatusx.map( (o) =>
   (o.Name))
 }

 get LAssignee(){
  this.LAssigneex = this.MLRData.filter( (o) =>
  (o.RLType=="Assignee"))
 
  return this.LAssigneex.map( (o) =>
   (o.Name))
 }


  Loadform(RequestData:any){
    //console.log("RequestData",RequestData)
    var Pcomment1 :string = " "
    for(let i=0;i<RequestData.comment.length;i++){
    console.log("RequestData.comment[i]",RequestData.comment[i])
    console.log("RequestData.commentDate[i]",RequestData.CommentDate[i].line)
    if(i==0){
      Pcomment1= ( i + 1) + '    '+ RequestData.CommentDate[i].line+ '    ' +  RequestData.comment[i].line 
    }else{
          Pcomment1 = Pcomment1 + '\n' + (i + 1) + '    ' + RequestData.CommentDate[i].line + '    '  + RequestData.comment[i].line 
        }
    }

    console.log("Pcomment1",Pcomment1)
    
     this.RequestForm.patchValue({
    
    DeveloperName:RequestData.DeveloperName,
    Type :RequestData.Type,
    SubmissionDate :RequestData.SubmissionDate,
    CompletionDate : RequestData.CompletionDate,
    status : RequestData.status,
  //  Input_file : RequestData.Input_file,
    Pcomment: Pcomment1,
    Assignee : RequestData.Assignee
   
    
  });
  this.Input_file.clearValidators();
  this.Input_file.updateValueAndValidity({emitEvent: false});
 // this.RequestForm.updateValueAndValidity({emitEvent: false});
  //console.log("test1",a)
 // this.route.navigate(['/IBSE/'])
}

  onSubmit(){
    //console.log("test",this.RequestForm.value);
   /* this.requestData[0]=[];
    this.requestData[0].id = 2
    this.requestData[0].DeveloperName= this.RequestForm.value.DeveloperName;
    this.requestData[0].Type= "xxxxx";
    this.requestData[0].SubmissionDate= this.RequestForm.value.SubmissionDate
    this.requestData[0].CompletionDate= this.RequestForm.value.CompletionDate
    this.requestData[0].status= this.RequestForm.value.status
*/
  //console.log("test",this.requestData[0]);

  
    const addobject1 = {
    id: this.RequestForm.value.id, 
    DeveloperName: this.RequestForm.value.DeveloperName,
    Type:this.RequestForm.value.Type ,
    SubmissionDate: this.RequestForm.value.SubmissionDate,
    CompletionDate: this.RequestForm.value.CompletionDate,
    status: this.RequestForm.value.status,
    Assignee: this.RequestForm.value.Assignee,
    Input_file: this.RequestForm.value.Input_file,
    comment:[{line:this.RequestForm.value.Ncomment}],
    CommentDate:[{line:this.dt1}]
    }
    
    console.log("this.RequestForm.value.ncomment",this.RequestForm.value.Ncomment)
    console.log("addobject1 ",addobject1.comment[0].line )

    this._requestService.Addelement(addobject1 )
   .subscribe(
     response => console.log('Success!', response),
     error => console.error('Error!', error)
   );
  }


  
  cancle(a:any,b:any,c:any,d:any,e:any,f:any,g:any){
    
    this.RequestForm.patchValue({
    id :a,
    DeveloperName : b,
    Type : c,
    SubmissionDate : d,
    status :e,
    Assignee :f,
    Ncomment :g 
  });
  
}

  UpdElement(requestdata:any) {
        
    const newformdata = { 
      id:this.selectedId,
      DeveloperName : this.RequestForm.value.DeveloperName,
      Type : this.RequestForm.value.Type,
      SubmissionDate : this.RequestForm.value.SubmissionDate,
      CompletionDate : this.RequestForm.value.CompletionDate,
      status : this.RequestForm.value.status,
      Input_file : this.RequestForm.value.Input_file,
      Ncomment: this.RequestForm.value.Ncomment      
    } ;
  
    this._requestService.updateJson(newformdata)
     }
  }  














































 


