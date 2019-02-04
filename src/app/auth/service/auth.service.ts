import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  registerUser(value : string): boolean {
    console.log("registerUser", value);
    return true;
  }
}
