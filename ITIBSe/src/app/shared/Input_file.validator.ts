import { AbstractControl } from '@angular/forms';


export function Input_fileValidator(control: AbstractControl): { [key: string]: boolean } | null {
    
    const Input_file = control.get('Input_file');
    let selectedId =0

  if(Input_file?.pristine || selectedId >0){
      return null;
  }  

    if(selectedId>0){
    console.log("test Input_file")
    return {'required': false , 'invalid': true}
    
    }
    else  {return null; }  
  }
  
