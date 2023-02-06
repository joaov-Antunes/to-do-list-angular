import { Component } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  public newTaskName: string = ''
  name: string = ''
  constructor(private fetch: FetchService, private router: Router, private toastr: ToastrService) {}

  postTask() {
    if(this.name == '') {
      this.toastr.error('Preenhcha os campos em branco antes de continuar', 'Erro', {
        timeOut: 3500
      });
    } else {
      this.toastr.success('Tarefa criada com sucesso', 'Sucesso!')
      this.fetch.createTask(this.name).subscribe(res => {
        console.log(res);
      });
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 50)
    }
    
  };
};
