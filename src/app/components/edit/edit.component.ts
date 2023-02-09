import { Component } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  urgency: string = '';
  tasks: any;
  id: any;
  
  constructor(private fetch: FetchService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {}

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

  editTask(id: number, name: string, urgency: string) {
    if (this.tasks.Nome == '' || this.urgency == '') {
      console.log(name)
      this.toastr.error('Preencha os campos em branco antes de continuar.', 'Erro', {
        timeOut: 3000,
      })
    } else {
      this.fetch.updateTask(id, name, urgency).subscribe(res => {
        console.log(res);
        this.toastr.success('Tarefa atualizada com sucesso', 'sucesso')
      });
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 50);
    }
  }
}
