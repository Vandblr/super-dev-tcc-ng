import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    SelectModule
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class CadastroInquilinos {
  nome: string = '';
  contato: string = '';
  documento: string = '';
  pessoas: number | null = null;
  statusPagamento: string = '';
  observacao: string = '';

  statusList = ['Em dia', 'Atrasado', 'Sem contrato'];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  salvar() {
    const dados = {
      nome: this.nome,
      contato: this.contato,
      documento: this.documento,
      pessoas: this.pessoas,
      status_pagamento: this.statusPagamento,
      observacao: this.observacao
    };

    this.http.post('http://localhost:8000/inquilinos', dados).subscribe({
      next: () => {
        alert('Inquilino cadastrado com sucesso!');
        this.router.navigate(['/inquilinos']);
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao cadastrar inquilino.');
      }
    });
  }

  cancelar() {
    this.router.navigate(['/inquilinos']);
  }
}