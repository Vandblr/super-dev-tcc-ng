import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

interface Inquilino {
  id: number;
  nome: string;
  contato: string;
  documento: string;
  pessoas: number;
  status_pagamento: string;
  observacao?: string;
}

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    RouterLink
  ],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class ListaInquilinos implements OnInit {
  inquilinos: Inquilino[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.listarInquilinos();
  }

  listarInquilinos() {
    this.http.get<Inquilino[]>('http://localhost:8000/inquilinos')
      .subscribe({
        next: (dados) => {
          this.inquilinos = dados;
        },
        error: (erro) => {
          console.error(erro);
          alert('Erro ao carregar inquilinos.');
        }
      });
  }

  excluir(inquilino: Inquilino) {
  const confirmar = confirm(`Deseja excluir o inquilino ${inquilino.nome}?`);

  if (!confirmar) {
    return;
  }

  this.http.delete(`http://localhost:8000/inquilinos/${inquilino.id}`)
    .subscribe({
      next: () => {
        alert('Inquilino excluído com sucesso!');
        this.listarInquilinos();
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao excluir inquilino.');
      }
    });
}
}