import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MenubarModule, ButtonModule, CardModule, DialogModule, InputTextModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class TelaHome {
  currentYear = new Date().getFullYear();
  showLoginDialog = false;
  email = '';
  password = '';

  constructor(private router: Router) {}

  menuItems: MenuItem[] = [
    { label: 'Início', icon: 'pi pi-home', command: () => this.router.navigate(['/home']) },
    { label: 'Imóveis', icon: 'pi pi-building', command: () => this.router.navigate(['/imoveis']) },
    { label: 'Inquilinos', icon: 'pi pi-users', command: () => this.router.navigate(['/inquilinos']) },
    { label: 'Solicitações', icon: 'pi pi-wrench', command: () => this.router.navigate(['/solicitacoes']) },
  ];

  cards = [
    { title: 'Imóveis', subtitle: 'Gerenciamento Completo', icon: 'pi pi-home', description: 'Cadastre, edite e visualize imóveis.', route: '/imoveis' },
    { title: 'Inquilinos', subtitle: 'Controle de Locatários', icon: 'pi pi-users', description: 'Gerencie dados e vínculos de inquilinos.', route: '/inquilinos' },
    { title: 'Solicitações', subtitle: 'Manutenções e Pedidos', icon: 'pi pi-wrench', description: 'Acompanhe solicitações e serviços.', route: '/solicitacoes' }
  ];

  navigate(route: string) {
    this.router.navigate([route]);
  }

  login() {
    if (this.email === 'admin@house.com' && this.password === '1234') {
      alert('Login realizado com sucesso!');
      this.showLoginDialog = false;
    } else {
      alert('Usuário ou senha inválidos.');
    }
  }
}
