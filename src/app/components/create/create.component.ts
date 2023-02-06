import { Component } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  public newTaskName: string = ''
  name: string = ''
  constructor(private fetch: FetchService) {}

  postTask() {
    this.fetch.createTask(this.name).subscribe(res => {
      console.log(res);
    });
  };
};
