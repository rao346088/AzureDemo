import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IBSEComponent } from './IBSE/IBSE.component'
import { RequestDataComponent } from './request-data/request-data.component';
import { RequestLookupComponent } from './request-lookup/request-lookup.component';



const routes: Routes = [
  {path: ' ', component: IBSEComponent},
  {path: 'IBSE',component: IBSEComponent },
  {path: 'IBSE/:id',component: IBSEComponent },
  {path: 'request-data',component:RequestDataComponent },
  {path: 'request-lookup', component:RequestLookupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [IBSEComponent,
                                  RequestDataComponent,
                                  RequestLookupComponent 
  ]