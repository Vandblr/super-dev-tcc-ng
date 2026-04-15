import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class TelaLogin {
  email: string = '';
  senha: string = '';

  constructor(private router: Router) {}

  entrar() {
    if (!this.email || !this.senha) {
      alert('Preencha e-mail e senha.');
      return;
    }

    // simulação de login válido
    if (this.email === 'admin@email.com' && this.senha === '123456') {
      this.router.navigate(['/painel']);
    } else {
      alert('Login inválido. Verifique seus dados.');
    }
  }
}