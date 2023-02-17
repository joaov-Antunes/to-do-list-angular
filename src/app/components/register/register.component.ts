import { Component } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  username: string = '';
  password: string = '';
  loginName: string = '';
  loginPassword = '';

  constructor(private fetch: FetchService, private router: Router) {}

  ngOnInit() {
    
  }

  register() {
    this.fetch.register(this.name, this.username, this.password).subscribe(res => {
      console.log(res);
    });
  };

  login() {
    this.fetch.login(this.loginName, this.loginPassword).subscribe(res => {
      if (res == null) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Senha ou Usuário invalidos.'
        });
      } else {
        
      }
      console.log(res);
    });
  };

}
