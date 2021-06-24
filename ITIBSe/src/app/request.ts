export interface IRequest {
    id:Number,
    DeveloperName: String,
    Type: string,
    SubmissionDate: Date,
    CompletionDate: Date,
    status: string,
    Assignee:string,
    //Select?: any,
    //delete?:any
    Input_file: File,
     Edit?:any,
    comment:{},
    CommentDate:{}
};

export interface IMRequest{
    id:Number;
    RLType: string;
    Name:string;
}