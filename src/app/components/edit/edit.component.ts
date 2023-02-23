import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import axios from 'axios';
import * as moment from 'moment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  urgency: string = '';
  levels: any;
  tasks: any;
  id: any;
  date: string = '';
  
  constructor(private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    this.route.params.subscribe(params => this.id = params['id']);
    this.getTasks(this.id);
    this.getUrgency();
  }

  getTasks(id: number) {
    axios.get(`http://localhost:3000/tasks/${id}`)
    .then(res => {
      this.tasks = [res.data];
    })
    console.log(id);
  }

  getUrgency() {
    axios.get('http://localhost:3000/urgency')
    .then(res => {
      this.levels = res.data;
    })
  }

  editTask(id: number, name: string, urgency: string, date: string) {
    if (this.tasks.Nome == '' || this.urgency == '' || this.date == '') {
      console.log(name)
      this.toastr.error('Preencha os campos em branco antes de continuar.', 'Erro', {
        timeOut: 3000,
      });
    } else {
      const formatedData = moment().format(this.date);
      axios.put(`http://localhost:3000/tasks/${id}`, {
        Nome: name,
        DataFinal: formatedData,
        Urgencia: urgency
      })
      .then(res => {
        console.log(res.data);
        this.toastr.success('Tarefa atualizada com sucesso', 'sucesso');
      });
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 50);
    }
  }
}
