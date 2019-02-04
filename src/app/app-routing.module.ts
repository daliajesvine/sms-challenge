import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { DataTableComponent } from './reports/data-table/data-table.component';
import { ReportsService } from './reports/service/reports.service';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'cityreports', component: DataTableComponent, resolve:{reportsService: ReportsService} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[ReportsService]
})
export class AppRoutingModule { }
