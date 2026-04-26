import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-homeoffline',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonModule,
    CardModule
  ],
  templateUrl: './homeoffline.html',
  styleUrls: ['./homeoffline.scss']
})
export class TelaHomeOffline {
  recursos = [
    {
      titulo: 'Gestão de Imóveis',
      descricao: 'Cadastre casas, acompanhe status e organize seus imóveis alugados.',
      icone: 'pi pi-building'
    },
    {
      titulo: 'Controle de Inquilinos',
      descricao: 'Gerencie moradores, contatos, histórico e vínculo com imóveis.',
      icone: 'pi pi-users'
    },
    {
      titulo: 'Solicitações',
      descricao: 'Registre manutenções, custos, serviços e pendências de cada casa.',
      icone: 'pi pi-wrench'
    }
  ];
}