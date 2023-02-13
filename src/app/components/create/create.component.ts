import { Component } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  name: string = '';
  urgency: string = '';
  date: string = '';
  constructor(private fetch: FetchService, private router: Router, private toastr: ToastrService) {}

  postTask() {
    if(this.name == '' || this.urgency == '', this.date == '') {
      this.toastr.error('Preenhcha os campos em branco antes de continuar', 'Erro', {
        timeOut: 3500
      });
    } else {
      this.toastr.success('Tarefa criada com sucesso', 'Sucesso!');
      const formatedDate = moment().format(this.date);
      this.fetch.createTask(this.name, this.urgency, formatedDate).subscribe(res => {
        console.log(res);
      });
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 50);
    };
  };
};
