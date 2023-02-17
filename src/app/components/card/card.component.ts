import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FetchService } from 'src/app/services/fetch.service';
import Swal from 'sweetalert2';

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
  
  constructor(private fetch: FetchService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getTasks();
    this.getDone();
  };

  getTasks() {
    this.fetch.getTasks().subscribe(res => {
      this.tasks = res;
    });
  }

  getDone() {
    this.fetch.getDone().subscribe(res => {
      this.doneTable = res;
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
        this.fetch.deleteTask(id).subscribe();
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
  
  finishTask(id: number) {
    this.finish = '';
    this.fetch.finishTask(id, this.done).subscribe(res => {
    console.log(res);
    });
    this.getTasks();
  };

  setStatus(id: number) {
    this.fetch.setStatus(id, this.status).subscribe(res => {
      console.log(res);
    })
  }

  searchTask(name: string) {
    if(this.name == '') {
      this.toastr.error('Preenhcha os campos em branco antes de continuar', 'Erro', {
        timeOut: 3500
      });
    } else {
      this.fetch.getTaskByName(name).subscribe(res => {
        console.log(res);
        return this.foundTask = [res];
      })
    };
  }
}