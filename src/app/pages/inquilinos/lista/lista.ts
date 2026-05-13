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
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    RouterLink
  ],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class ListaInquilinos implements OnInit {
  inquilinos: Inquilino[] = [];

  inquilinoSelecionado: Inquilino | null = null;
  mostrarDetalhes: boolean = false;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

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
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao carregar inquilinos.'
          });
        }
      });
  }

  verDetalhes(inquilino: Inquilino) {
    this.inquilinoSelecionado = inquilino;
    this.mostrarDetalhes = true;
  }

  excluir(inquilino: Inquilino) {
    this.confirmationService.confirm({
      message: `Deseja excluir o inquilino ${inquilino.nome}?`,
      header: 'Confirmar exclusão',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.http.delete(`http://localhost:8000/inquilinos/${inquilino.id}`)
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Inquilino excluído com sucesso!'
              });

              this.listarInquilinos();
            },
            error: (erro) => {
              console.error(erro);

              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao excluir inquilino.'
              });
            }
          });
      }
    });
  }
}