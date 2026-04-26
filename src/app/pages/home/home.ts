import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonModule,
    CardModule,
    TableModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class TelaHome {
  cardsResumo = [
    {
      titulo: 'Imóveis',
      valor: 5,
      descricao: 'Imóveis cadastrados',
      icone: 'pi pi-building',
      rota: '/imoveis'
    },
    {
      titulo: 'Inquilinos',
      valor: 4,
      descricao: 'Inquilinos ativos',
      icone: 'pi pi-users',
      rota: '/inquilinos'
    },
    {
      titulo: 'Solicitações',
      valor: 2,
      descricao: 'Manutenções pendentes',
      icone: 'pi pi-wrench',
      rota: '/solicitacoes'
    },
    {
      titulo: 'Lucro Mensal',
      valor: 'R$ 3.250',
      descricao: 'Estimativa do mês',
      icone: 'pi pi-wallet',
      rota: '/financeiro'
    }
  ];

  pagamentosRecentes = [
    { inquilino: 'João Silva', imovel: 'Casa Azul', valor: 'R$ 1.200', status: 'Pago' },
    { inquilino: 'Maria Santos', imovel: 'Casa Verde', valor: 'R$ 950', status: 'Atrasado' },
    { inquilino: 'Pedro Oliveira', imovel: 'Casa Centro', valor: 'R$ 1.100', status: 'Pendente' }
  ];

  constructor(private router: Router) {}

  navegar(rota: string) {
    this.router.navigate([rota]);
  }
}