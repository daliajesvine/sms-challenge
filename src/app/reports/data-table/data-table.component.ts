import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';
import { CityReportsData } from './city-reports-data';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators'

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DataTableDataSource;

  constructor(
    private actr : ActivatedRoute
  ){ }
  
  displayedColumns = ['city', 'start_date', 'end_date', 'price', 'status', 'color'];

  ngOnInit() {
    this.actr.data.subscribe((data : any) => {
      this.dataSource = new DataTableDataSource(this.paginator, this.sort, data.reportsService);
});
  }
}
