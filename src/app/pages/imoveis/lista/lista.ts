import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
    DialogModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    RouterLink
  ],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class ListaImoveis implements OnInit {
  imoveis: Imovel[] = [];

  imovelSelecionado: Imovel | null = null;
  mostrarDetalhes: boolean = false;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

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
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao carregar imóveis.'
          });
        }
      });
  }

  verDetalhes(imovel: Imovel) {
    this.imovelSelecionado = imovel;
    this.mostrarDetalhes = true;
  }

  excluir(imovel: Imovel) {
    this.confirmationService.confirm({
      message: `Deseja excluir o imóvel ${imovel.nome}?`,
      header: 'Confirmar exclusão',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.http.delete(`http://localhost:8000/imoveis/${imovel.id}`)
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Imóvel excluído com sucesso!'
              });

              this.listarImoveis();
            },
            error: (erro) => {
              console.error(erro);

              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao excluir imóvel.'
              });
            }
          });
      }
    });
  }
}