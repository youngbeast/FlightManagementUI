import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingHistoryDetails } from '../models/BookingModel';


@Injectable()
@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html'
})
export class MyBookingsComponent implements OnInit {

  isBookingHistoryRequired: boolean = false;
  emailId: string = '';
  loading: boolean = false;
  pnr: string = '';
  bookingHistoryDetails: BookingHistoryDetails = new BookingHistoryDetails();
  bookingHistoryDetailsArray: Array<BookingHistoryDetails> = new Array<BookingHistoryDetails>();

  constructor(public httpc: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.getBookingHistoryByEmail()
  }

  getBookingHistoryByEmail() {
    this.loading = true;
    this.isBookingHistoryRequired = true;
    const emailIdNew = localStorage.getItem('userEmailId');
    const url = "http://localhost:48531/api/flight/booking/history/" + emailIdNew;
    this.httpc.get(url).subscribe(res => this.Success(res), res => this.Error(res))
  }

  getBookingHistoryByPnr() {
    this.loading = true;
    this.isBookingHistoryRequired = true;
    const url = "http://localhost:48531/api/flight/booking/ticket/" + this.pnr;
    this.httpc.get(url).subscribe(res => this.Success(res), res => this.Error(res))
    alert("Ticket booked with PNR" + this.pnr);
  }

  Error(res: any) {
    alert(res.Response);
    this.loading = false;
    console.log(res);
  }
  Success(res: any) {

    if (this.isBookingHistoryRequired)
      this.bookingHistoryDetailsArray = res;
    this.loading = false;
  }
}
