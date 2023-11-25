import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientDetialsService {
  public patientDetials: any = [
    {
      firstName: "akkash",
      lastName: "arun",
      dob: "1999-07-02",  //yyyy-mm-dd
      address: "123,abc,xyz",
      postcode: "ne46pl",
      AppointmentDetials:[
        {
        appointmentId : 123,
        appointmentDate: "11/20/2023", //mm/dd/yyyy
        appointmentCenter : "Abc Medical",
        appointmentTime: "18.15"
        },
        {
          appointmentId : 423,
          appointmentDate: "11/20/2023", //mm/dd/yyyy
          appointmentCenter : "Abc Medical",
          appointmentTime: "11.26"
          }
      ]
    },
    {
      firstName: "abraham",
      lastName: "arun",
      dob: "1995-04-05",   //yyyy-mm-dd
      address: "789,adbc,xyz",
      postcode: "ne21aw",
      AppointmentDetials:[
        {
          appointmentId : 4223,
          appointmentDate: "12/11/2023", //mm/dd/yyyy
          appointmentCenter : "xyz Medical",
          appointmentTime: "16.00"
        },
        {
          appointmentId : 4923,
          appointmentDate: "04/10/2023",   //mm/dd/yyyy
          appointmentCenter : "xyz Medical",
          appointmentTime: "10.30"
          }
      ]
    }
  ]

  public getPatientDataset(){
    return this.patientDetials;
  }
  constructor() { }
}
