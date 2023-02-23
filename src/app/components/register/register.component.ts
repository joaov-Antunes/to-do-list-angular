import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import axios from 'axios';

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

  constructor(private router: Router) {}

  ngOnInit() {
    
  }

  register() {
    if(this.name == '' || this.username == '', this.password == '') {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Preencha os campos em branco antes de prosseguir',
      })
    } else {
      axios.post('http://localhost:3000/register', {
        Nome: this.name,
        NomeUsuario: this.username,
        Senha: this.password
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    }
  };

  login() {
    if(this.loginName == "" || this.loginPassword == "") {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Preencha os campos em branco antes de prosseguir',
      })
    } else {
        axios.post('http://localhost:3000/login', {
          NomeUsuario: this.loginName,
          Senha: this.loginPassword
        })
        .then(res => {
          localStorage.setItem('x-access-token', res.data.token);
          console.log(res.data.token);

          if(res.data.token != null) {
            this.router.navigate(['/home']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erro',
              text: 'Senha ou usuário inválidos',
            });
          }
        })
        .catch(err => {
          console.log(err);
        })
    };
  };
};
