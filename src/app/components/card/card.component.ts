import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import axios from 'axios';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  tasks: any;
  finish: string = 'Concluir até:';
  name: string = '';
  foundTask: any;
  done: string = '';
  status: boolean = false;
  doneTable: any;
  IsItDone: string = '';
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  constructor(private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('x-access-token');
    if(token == null) {
      console.log('No token provided');
    } else {
      this.getDone();
      this.getTasks();
    }
  };

  logout() {
    localStorage.removeItem('x-access-token');
    this.router.navigate(['/login']);
  }

  getTasks() {
    const token = localStorage.getItem('x-access-token')
    axios.get('http://localhost:3000/tasks', {
      headers: {
        'x-access-token': token,
      }
    })
    .then(res => {
      this.tasks = res.data;
      console.log(res.data);
    })
  }

  getDone() {
    axios.get('http://localhost:3000/finish')
    .then(res => {
      this.doneTable = res.data
    })
    .catch(err => {
      console.log(err);
    })
  }

  deleteTask(id: number) {
    this.swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/tasks/${id}`)
        this.swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.getTasks();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
  
  finishTask(id: number, done: string) {
    axios.put(`http://localhost:3000/tasks/${id}`, {
      Feita: done
    })
    .then(res => {
      console.log(res.data);
      this.getTasks();
    })
    .catch(err => {
      console.log(err);
    })
  };

  setStatus(id: number, done: boolean) {
    axios.put(`http://localhost:3000/tasks/${id}`, {
      StatusTarefa: done
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  searchTask(name: string) {
    if(this.name == '') {
      this.toastr.error('Preenhcha os campos em branco antes de continuar', 'Erro', {
        timeOut: 3500
      });
    } else {
      axios.get(`http://localhost:3000/tasks/search/${name}`)
      .then(res => {
        console.log(res.data);
        return this.foundTask = [res.data];
      })
      .catch(err => {
        console.log(err);
      })
    };
  }
}