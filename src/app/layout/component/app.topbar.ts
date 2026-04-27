import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../service/layout.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule, CommonModule, ButtonModule],
  template: `
    <div class="layout-topbar clean-topbar">
      <div class="layout-topbar-logo-container">
        <a class="layout-topbar-logo" routerLink="/painel">
          HouseManager
        </a>
      </div>

      <div class="layout-topbar-actions">
        <button
          pButton
          icon="pi pi-sign-out"
          label="Sair"
          class="p-button-text"
          (click)="logout()"
        ></button>
      </div>
    </div>
  `
})
export class AppTopbar {

  constructor(public layoutService: LayoutService, private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }
}