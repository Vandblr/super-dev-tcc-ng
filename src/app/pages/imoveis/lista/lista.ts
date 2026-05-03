import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

interface Imovel {
  id: number;
  nome: string;
  endereco: string;
  status: string;
  cor?: string;
  garagem?: string;
  quartos?: number;
  banheiros?: number;
}

@Component({
  selector: 'app-lista-imovel',
  standalone: true,
  imports: [
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
export class ListaImoveis implements OnInit {
  imoveis: Imovel[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.listarImoveis();
  }

  listarImoveis() {
    this.http.get<Imovel[]>('http://localhost:8000/imoveis')
      .subscribe({
        next: (dados) => {
          this.imoveis = dados;
        },
        error: (erro) => {
          console.error(erro);
          alert('Erro ao carregar imóveis.');
        }
      });
  }
}