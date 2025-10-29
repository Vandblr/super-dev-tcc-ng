import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

interface Imovel {
  id: number;
  nome: string;
  endereco: string;
  status: string;
}

@Component({
  selector: 'app-lista-imovel',
 imports: [CommonModule, TableModule, ButtonModule, CardModule, InputTextModule, RouterLink],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class ListaImoveis {
   imoveis: Imovel[] = [
    { id: 1, nome: 'Casa Azul', endereco: 'Rua das Flores, 45', status: 'Ocupado' },
    { id: 2, nome: 'Apartamento Sol', endereco: 'Av. Brasil, 1020', status: 'Disponível' },
    { id: 3, nome: 'Casa Verde', endereco: 'Rua Jardim, 87', status: 'Em manutenção' }
  ];

}
