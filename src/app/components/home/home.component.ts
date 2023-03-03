import { FetchService } from "src/app/services/fetch.service";
import { Component } from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  constructor(private fetch: FetchService) {}

  logout() {
    const response  = localStorage.removeItem('login');
    console.log(response);
  }
}
