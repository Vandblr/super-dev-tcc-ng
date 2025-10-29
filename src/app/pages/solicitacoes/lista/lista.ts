import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

interface Solicitacao {
  id: number;
  tipoServico: string;
  data: string;
  custo: number;
  status: string;
  vinculoCasa: string;
}

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule, InputTextModule, FormsModule, RouterLink],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class ListaSolicitacoes {

    solicitacoes: Solicitacao[] = [
    { id: 1, tipoServico: 'Pintura', data: '2025-10-01', custo: 450, status: 'Concluído', vinculoCasa: 'Casa Azul' },
    { id: 2, tipoServico: 'Jardinagem', data: '2025-10-10', custo: 120, status: 'Em andamento', vinculoCasa: 'Casa Verde' },
    { id: 3, tipoServico: 'Elétrica', data: '2025-10-15', custo: 320, status: 'Pendente', vinculoCasa: 'Apartamento Sol' }
  ];


}
