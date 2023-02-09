import { FetchService } from "src/app/services/fetch.service";
import { Component } from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private fetch: FetchService) {}
  tasks: any;

  ngOnInit() {
    this.fetch.getTasks().subscribe(res => {
      console.log(res);
      this.tasks = res
    });
  }
}
