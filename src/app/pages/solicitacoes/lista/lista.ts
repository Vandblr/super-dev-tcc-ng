import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

interface Solicitacao {
  id: number;
  tipo_servico: string;
  data: string;
  custo: number;
  status: string;
  vinculo_casa: string;
  observacao?: string;
}

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    FormsModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    RouterLink
  ],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class ListaSolicitacoes implements OnInit {
  solicitacoes: Solicitacao[] = [];

  solicitacaoSelecionada: Solicitacao | null = null;
  mostrarDetalhes: boolean = false;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.listarSolicitacoes();
  }

  listarSolicitacoes() {
    this.http.get<Solicitacao[]>('http://localhost:8000/solicitacoes')
      .subscribe({
        next: (dados) => {
          this.solicitacoes = dados;
        },
        error: (erro) => {
          console.error(erro);

          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao carregar solicitações.'
          });
        }
      });
  }

  verDetalhes(solicitacao: Solicitacao) {
    this.solicitacaoSelecionada = solicitacao;
    this.mostrarDetalhes = true;
  }

  excluir(solicitacao: Solicitacao) {
    this.confirmationService.confirm({
      message: `Deseja excluir a solicitação ${solicitacao.tipo_servico}?`,
      header: 'Confirmar exclusão',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.http.delete(`http://localhost:8000/solicitacoes/${solicitacao.id}`)
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Solicitação excluída com sucesso!'
              });

              this.listarSolicitacoes();
            },
            error: (erro) => {
              console.error(erro);

              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao excluir solicitação.'
              });
            }
          });
      }
    });
  }
}