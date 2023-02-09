import { Component } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  name: string = '';
  task: any;
  constructor(private fetch: FetchService, private toastr: ToastrService) {}

  searchTask(name: string) {
    if(this.name == '') {
      this.toastr.error('Preenhcha os campos em branco antes de continuar', 'Erro', {
        timeOut: 3500
      });
    } else {
      this.fetch.getTaskByName(name).subscribe(res => {
        console.log(res);
        return this.task = res;
      })
    };
    
  }
}
