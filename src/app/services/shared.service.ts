import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  mySharedFunction(){
    console.log("Shared servcie called");
  }
}
