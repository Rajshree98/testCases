import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  constructor() { }

  multiply(a:number,b:number){
    return a*b;
  }
}
