import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
<<<<<<< HEAD
  constructor(private fetch: FetchService) {}

  logout() {
    const response  = localStorage.removeItem('login');
    console.log(response);
  }
=======

>>>>>>> fed20fa4a6fdf5bd900f01b099af52dcddaa27bc
}
