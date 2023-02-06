import { Component } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  tasks: any;
  id: any;
  name: string = '';
  constructor(private fetch: FetchService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => this.id = params['id']);
    this.getTasks(this.id);
  }

  getTasks(id: number) {
    this.fetch.getTaskById(id).subscribe(res => {
      return this.tasks = [res];
    });
    console.log(id);
  }

  editTask(id: number, name: string) {
    this.fetch.updateTask(id, name).subscribe(res => {
      console.log(res);
    });
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 10);
  }
}
