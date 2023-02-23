import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import axios from 'axios'
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
    urgency: string = '';
  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    axios.get('http://localhost:3000/urgency')
    .then(res => {
      this.levels = res.data
    })
  }
  
  postTask() {
    if(this.name == '' || this.date == '' || this.urgency == '') {
      this.toastr.error('Preenhcha os campos em branco antes de continuar', 'Erro', {
        timeOut: 3500
      });
    } else {
      const formatedDate = moment().format(this.date);
      axios.post('http://localhost:3000/tasks', {
        Nome: this.name,
        DataFinal: formatedDate,
        Urgencia: this.urgency,
        Feita: 'Pendente'
      })
      .then(res => {
        this.toastr.success('Tarefa criada com sucesso', 'Sucesso!');
        console.log([res.data]);
        this.router.navigate(['/home']);
      })
      .catch(err => {
        console.error(err);
      })
    };
  };
};
