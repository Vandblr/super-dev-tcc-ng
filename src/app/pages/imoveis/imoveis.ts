import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { RouterLink, RouterLinkActive } from "@angular/router";

interface Imovel {
  id: number;
  nome: string;
  endereco: string;
  status: string;
}


@Component({
  selector: 'app-imoveis',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule, InputTextModule, RouterLink],
  templateUrl: './imoveis.html',
  styleUrl: './imoveis.scss'
})
export class TelaImoveis {
   imoveis: Imovel[] = [
    { id: 1, nome: 'Casa Azul', endereco: 'Rua das Flores, 45', status: 'Ocupado' },
    { id: 2, nome: 'Apartamento Sol', endereco: 'Av. Brasil, 1020', status: 'Disponível' },
    { id: 3, nome: 'Casa Verde', endereco: 'Rua Jardim, 87', status: 'Em manutenção' }
  ];

}
