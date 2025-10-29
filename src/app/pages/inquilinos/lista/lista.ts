import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
  statusPagamento: string;
  observacao?: string;
}

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [FormsModule, CommonModule, TableModule, ButtonModule, CardModule, InputTextModule, RouterLink],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class ListaInquilinos {

  inquilinos: Inquilino[] = [
    { id: 1, nome: 'João Silva', contato: '(47) 99999-1111', documento: '123.456.789-00', pessoas: 3, statusPagamento: 'Em dia' },
    { id: 2, nome: 'Maria Santos', contato: '(47) 98888-2222', documento: '987.654.321-00', pessoas: 2, statusPagamento: 'Atrasado' },
    { id: 3, nome: 'Pedro Oliveira', contato: '(47) 97777-3333', documento: '456.789.123-00', pessoas: 1, statusPagamento: 'Em dia' }
  ];


}
