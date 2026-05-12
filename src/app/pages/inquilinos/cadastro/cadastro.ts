import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
export class CadastroInquilinos implements OnInit {
  id: number | null = null;
  modoEdicao: boolean = false;

  nome: string = '';
  contato: string = '';
  documento: string = '';
  pessoas: number | null = null;
  statusPagamento: string = '';
  observacao: string = '';

  statusList = ['Em dia', 'Atrasado', 'Sem contrato'];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.id = Number(idParam);
      this.modoEdicao = true;
      this.carregarInquilino(this.id);
    }
  }

  carregarInquilino(id: number) {
    this.http.get<any>(`http://localhost:8000/inquilinos/${id}`).subscribe({
      next: (inquilino) => {
        this.nome = inquilino.nome;
        this.contato = inquilino.contato;
        this.documento = inquilino.documento;
        this.pessoas = inquilino.pessoas;
        this.statusPagamento = inquilino.status_pagamento;
        this.observacao = inquilino.observacao;
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao carregar inquilino.');
      }
    });
  }

  salvar() {
    const dados = {
      nome: this.nome,
      contato: this.contato,
      documento: this.documento,
      pessoas: this.pessoas,
      status_pagamento: this.statusPagamento,
      observacao: this.observacao
    };

    if (this.modoEdicao && this.id !== null) {
      this.http.put(`http://localhost:8000/inquilinos/${this.id}`, dados).subscribe({
        next: () => {
          alert('Inquilino atualizado com sucesso!');
          this.router.navigate(['/inquilinos']);
        },
        error: (erro) => {
          console.error(erro);
          alert('Erro ao atualizar inquilino.');
        }
      });
    } else {
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
  }

  cancelar() {
    this.router.navigate(['/inquilinos']);
  }
}