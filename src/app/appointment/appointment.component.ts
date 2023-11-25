import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PatientDetialsService } from '../patient-detials.service';
import {CenterAppointmentDetialsService} from '../center-appointment-detials.service'
import { Time, getLocaleDateFormat } from '@angular/common';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  public patientData : any ; 
  public todayDate: Date;
  public appointmentTime: Date= new Date();
  // public appointmentTimeMin:Date= new Date();
  // public appointmentTimeMax:Date= new Date();
  public appointmentTimeMin:number=0;
  public appointmentTimeMax:number=0;
  public timeInt :number =0;
  public appointmentForm: boolean = true;
  public appointmentSuccess: boolean = false;
  public appointmentFailure: boolean = false;
  public appointmntMessage: String = "";
  //public currentTime : TimeRanges;
  public patientsAppointment: any =[];

  constructor(
    private route: Router,
    private patientService: PatientDetialsService,
    private CenterAppointmentDetialsService: CenterAppointmentDetialsService ) {
        this.patientData = patientService.getPatientDataset();
        this.todayDate = new Date();
  }

  ngOnInit(): void {
      let appointmentTimeArr = (this.patientData[0].AppointmentDetials[0].appointmentTime.split("."));
      this.appointmentTime.setHours(parseInt(appointmentTimeArr[0]),parseInt(appointmentTimeArr[1],0));
      // this.appointmentTimeMin= new Date(this.appointmentTime.getTime() - 30 *60*1000) ;
      // this.appointmentTimeMax= new Date(this.appointmentTime.getTime() - 5 *60*1000) ;
      this.appointmentTimeMax = 5* 60000;  // convert minutes to milleseconds
      this.appointmentTimeMin= 30* 60000;
      this.timeInt = (this.appointmentTime.getTime()-this.todayDate.getTime());
      console.log(this.todayDate.toLocaleDateString() == this.patientData[0].AppointmentDetials[0].appointmentDate , this.timeInt, this.appointmentTimeMax,this.appointmentTimeMin)
      // if(this.todayDate.getTime() >= this.appointmentTimeMin.getTime() && this.todayDate.getTime()<=this.appointmentTimeMin.getTime()){
      //   console.log("yes")
      // }
      if(this.timeInt >= this.appointmentTimeMax && this.timeInt<=this.appointmentTimeMin && this.todayDate.toLocaleDateString() == this.patientData[0].AppointmentDetials[0].appointmentDate){
        console.log("yes")
      }
    }
  onSumbit(event:any){
    //console.log("form submited",event.target.firstName.value,this.patientData);
    let userFirstName :string = event.target.firstName.value.toLowerCase();
    let userLastName :string = event.target.lastName.value.toLowerCase();
    let userDOB :any = event.target.dob.value;
    let userPostCode :string = event.target.postCode.value.toLowerCase();


    for (let i of this.patientData ){
      if(i.firstName == userFirstName && i.lastName === userLastName && i.dob == userDOB && i.postcode== userPostCode){
        if(i.AppointmentDetials.length<=0){
          this.appointmentForm =false;
          this.appointmentFailure = true;
          this.appointmntMessage= "We are really sorry.! YOu don't have any active appointment at this time. If you have anyother queries please reach out to the Reception Center. Thanks For using Outpatient Kiosk. "
        }
        for(let j of i.AppointmentDetials){
          if(j.appointmentDate == this.todayDate.toLocaleDateString()){
            if(this.timeInt >= this.appointmentTimeMax && this.timeInt<=this.appointmentTimeMin ){
              this.appointmentForm =false;
              this.appointmentSuccess =true;   
              this.appointmntMessage = "Thanks for using the Outpatient Kiosk. You have been virtualy checked in Please wait in the waiting area until your turn comes.Have a good day."           
              let appointmentUpdate={
                appointmentId: j.appointmentId,
                appointmentDate: this.todayDate,
                patientName: i.lastName,
                patientDOB: i.dob,
                checkedInTime: this.todayDate.getTime()
              }
              this.patientsAppointment.push(appointmentUpdate);             
              this.CenterAppointmentDetialsService.setCenterAppointmentDetials(this.patientsAppointment);
              console.log(this.CenterAppointmentDetialsService.getCenterAppointmentDetials());
              break;
            }
            else{
              // console.log("no");
              this.appointmentForm =false;
              this.appointmentFailure = true;
              this.appointmntMessage= "We are really sorry.! You don't have any active appointment at this time. If you have anyother queries please reach out to the Reception Center. Thanks For using Outpatient Kiosk. "
              
            }
          }
        }
        break;
      }
      else{
        this.appointmentForm= false;
        this.appointmentFailure=true;
        this.appointmntMessage=`We are really sorry.!
         We couldn't fetch your data at this time.
         Please try again or get help from the Reception Center. 
         Thanks For using Outpatient Kiosk.`
      }
    }

  }

  goHome(){
    this.route.navigate(['../']);
  }
}
