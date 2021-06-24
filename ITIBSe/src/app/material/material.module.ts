import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';
import { MatSortModule} from '@angular/material/sort'; 
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule} from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';



const Importcomp = [
  MatButtonModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule
 
  
]



@NgModule({
 
  imports: [Importcomp] ,
  exports:[Importcomp]
})
export class MaterialModule { }
