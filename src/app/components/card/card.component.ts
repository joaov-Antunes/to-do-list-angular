import { Component } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  tasks: any;
  finish: string = 'Concluir até:';
  constructor(private fetchService: FetchService) {}

  ngOnInit(): void {
    this.fetchService.getTasks().subscribe(res => {
      this.tasks = res;
    })
  };

  deleteTask(id: number) {
    this.fetchService.deleteTask(id).subscribe();
    this.fetchService.getTasks()
    window.location.reload();
  }

  finishTask(id: number) {
    this.finish = 'Concluida';
    this.fetchService.finishTask(id).subscribe(res => {
      console.log(res);
    });
  }
}