import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, from } from 'rxjs';
import { ReportsService } from '../service/reports.service';
import { CityReportsData } from './city-reports-data'

export class DataTableDataSource extends DataSource<CityReportsData>{


  constructor(
    private paginator: MatPaginator, 
    private sort: MatSort,
    private data : CityReportsData[]) {
      super();
  }

  connect(): Observable<CityReportsData[]> {

    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {}

  private getPagedData(data: CityReportsData[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: CityReportsData[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'city': return compare(a.city, b.city, isAsc);
        case 'start_date': return compareDate(a.start_date, b.start_date, isAsc);
        case 'end_date': return compareDate(a.end_date, b.end_date, isAsc);
        case 'price': return compare(+a.price, +b.price, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        case 'color': return compare(a.color, b.color, isAsc);

        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
function compareDate(a, b, isAsc) {
  let aDateArray = a.split('/');
  let bDateArray = b.split('/');
  const adate = new Date(aDateArray[2], aDateArray[0], aDateArray[1]);
  const bdate = new Date(bDateArray[2], bDateArray[0], bDateArray[1]);

  return (adate < bdate ? -1 : 1) * (isAsc ? 1 : -1);
}
