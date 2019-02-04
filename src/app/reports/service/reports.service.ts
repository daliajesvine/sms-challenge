import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReportsService implements Resolve<any>{

  constructor(
   private httpClient: HttpClient
  ) { }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot) {
    return this.httpClient.get('../../../assets/data.json');

  }
}
