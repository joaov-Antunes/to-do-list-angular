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
    levels: any;
    name: string = '';
    date: string = '';
  constructor(private fetch: FetchService, private router: Router, private toastr: ToastrService) {}



  ngOnInit() {
    this.fetch.getUrgency().subscribe(res => {
      return this.levels = res;
    })
  }
    


  postTask() {
    if(this.name == '' || this.date == '') {
      this.toastr.error('Preenhcha os campos em branco antes de continuar', 'Erro', {
        timeOut: 3500
      });
    } else {
      this.toastr.success('Tarefa criada com sucesso', 'Sucesso!');
      const formatedDate = moment().format(this.date);
      this.fetch.createTask(this.name, formatedDate).subscribe(res => {
        console.log(res);
      });
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 50);
    };
  };
};
