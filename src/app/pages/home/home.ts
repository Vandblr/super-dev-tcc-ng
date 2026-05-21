import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';

interface Imovel {
  id: number;
  nome: string;
  status: string;
}

interface Inquilino {
  id: number;
  nome: string;
  status_pagamento: string;
}

interface Solicitacao {
  id: number;
  tipo_servico: string;
  status: string;
  custo: number;
  vinculo_casa: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonModule,
    CardModule,
    TableModule,
    ChartModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class TelaHome implements OnInit {
  cardsResumo: any[] = [];

  imoveis: Imovel[] = [];
  inquilinos: Inquilino[] = [];
  solicitacoes: Solicitacao[] = [];

  graficoImoveis: any;
  graficoSolicitacoes: any;
  opcoesGrafico: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.carregarDadosDashboard();
    this.configurarOpcoesGrafico();
  }

  carregarDadosDashboard() {
    this.http.get<Imovel[]>('http://localhost:8000/imoveis').subscribe({
      next: (dados) => {
        this.imoveis = dados;
        this.atualizarDashboard();
      },
      error: (erro) => console.error('Erro ao carregar imóveis', erro)
    });

    this.http.get<Inquilino[]>('http://localhost:8000/inquilinos').subscribe({
      next: (dados) => {
        this.inquilinos = dados;
        this.atualizarDashboard();
      },
      error: (erro) => console.error('Erro ao carregar inquilinos', erro)
    });

    this.http.get<Solicitacao[]>('http://localhost:8000/solicitacoes').subscribe({
      next: (dados) => {
        this.solicitacoes = dados;
        this.atualizarDashboard();
      },
      error: (erro) => console.error('Erro ao carregar solicitações', erro)
    });
  }

  atualizarDashboard() {
    this.atualizarCards();
    this.atualizarGraficos();
  }

  atualizarCards() {
    const totalImoveis = this.imoveis.length;
    const imoveisDisponiveis = this.imoveis.filter(imovel => imovel.status === 'Disponível').length;
    const imoveisManutencao = this.imoveis.filter(imovel => imovel.status === 'Em manutenção').length;

    const totalInquilinos = this.inquilinos.length;
    const inquilinosAtrasados = this.inquilinos.filter(inquilino => inquilino.status_pagamento === 'Atrasado').length;

    const solicitacoesPendentes = this.solicitacoes.filter(solicitacao => solicitacao.status === 'Pendente').length;
    const solicitacoesConcluidas = this.solicitacoes.filter(solicitacao => solicitacao.status === 'Concluído').length;

    const custoTotal = this.solicitacoes.reduce((total, solicitacao) => {
      return total + (solicitacao.custo || 0);
    }, 0);

    this.cardsResumo = [
      {
        titulo: 'Imóveis',
        valor: totalImoveis,
        descricao: `${imoveisDisponiveis} disponíveis | ${imoveisManutencao} em manutenção`,
        icone: 'pi pi-building',
        rota: '/imoveis'
      },
      {
        titulo: 'Inquilinos',
        valor: totalInquilinos,
        descricao: `${inquilinosAtrasados} com pagamento atrasado`,
        icone: 'pi pi-users',
        rota: '/inquilinos'
      },
      {
        titulo: 'Solicitações',
        valor: solicitacoesPendentes,
        descricao: `${solicitacoesConcluidas} concluídas`,
        icone: 'pi pi-wrench',
        rota: '/solicitacoes'
      },
      {
        titulo: 'Custos',
        valor: `R$ ${custoTotal.toFixed(2)}`,
        descricao: 'Total em manutenções registradas',
        icone: 'pi pi-wallet',
        rota: '/solicitacoes'
      }
    ];
  }

  atualizarGraficos() {
    const disponiveis = this.imoveis.filter(imovel => imovel.status === 'Disponível').length;
    const alugados = this.imoveis.filter(imovel => imovel.status === 'Alugado').length;
    const manutencao = this.imoveis.filter(imovel => imovel.status === 'Em manutenção').length;

    const pendentes = this.solicitacoes.filter(s => s.status === 'Pendente').length;
    const andamento = this.solicitacoes.filter(s => s.status === 'Em andamento').length;
    const concluidas = this.solicitacoes.filter(s => s.status === 'Concluído').length;
    const canceladas = this.solicitacoes.filter(s => s.status === 'Cancelado').length;

    this.graficoImoveis = {
      labels: ['Disponíveis', 'Alugados', 'Manutenção'],
      datasets: [
        {
          data: [disponiveis, alugados, manutencao]
        }
      ]
    };

    this.graficoSolicitacoes = {
      labels: ['Pendentes', 'Em andamento', 'Concluídas', 'Canceladas'],
      datasets: [
        {
          data: [pendentes, andamento, concluidas, canceladas]
        }
      ]
    };
  }

  configurarOpcoesGrafico() {
    this.opcoesGrafico = {
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    };
  }

  navegar(rota: string) {
    this.router.navigate([rota]);
  }
}