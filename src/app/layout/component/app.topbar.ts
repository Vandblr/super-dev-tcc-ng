import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, FormsModule, MenubarModule, ButtonModule, CardModule, DialogModule, InputTextModule],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/">
                    TCC
            </a>

            
<p-menubar [model]="menuItems" class="shadow-2 surface-50 border-none mb-4"></p-menubar>
        </div>



        <div class="layout-topbar-actions">


            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <button type="button" class="layout-topbar-action"  (click)="showLoginDialog = true">
                        <i class="pi pi-user"></i>
                        <span>Login</span>
                    </button>
                </div>
            </div>
        </div>
    </div>`
})
export class AppTopbar {
    items!: MenuItem[];
    menuItems: MenuItem[] = [
        { label: 'Imóveis', icon: 'pi pi-building', command: () => this.router.navigate(['/imoveis']) },
        { label: 'Inquilinos', icon: 'pi pi-users', command: () => this.router.navigate(['/inquilinos']) },
        { label: 'Solicitações', icon: 'pi pi-wrench', command: () => this.router.navigate(['/solicitacoes']) },
    ];
    showLoginDialog = false;


    constructor(public layoutService: LayoutService, private router: Router) { }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
