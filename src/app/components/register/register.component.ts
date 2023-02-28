import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private router: Router, private toastr: ToastrService) {}

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
        this.toastr.success('Cadastro efetuado com sucesso', 'sucesso');
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
          if(res.data.token != null) {
            localStorage.setItem('x-access-token', res.data.token);
            console.log(res.data.token);
            this.router.navigate(['/home']);
          } else {
            
          }
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Senha ou usuário inválidos',
          });
          console.log(err);
        })
    };
  };
};
