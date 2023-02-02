import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { TempComponent } from './shared/temp/temp.component';

const routes: Routes = [
  { path : '', component : AdminComponent},
  { path : 'admin', component : AdminComponent},
  { path : 'temp', component : TempComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
