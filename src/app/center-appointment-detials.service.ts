import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CenterAppointmentDetialsService {
  public CenterAppointmentDetials: any =[];

  public setCenterAppointmentDetials(value?:any){
    this.CenterAppointmentDetials.push(value);
  }

  public getCenterAppointmentDetials (){
    return this.CenterAppointmentDetials;
  }
  constructor() { }
}
