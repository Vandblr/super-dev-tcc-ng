import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { TelaLogin } from '@/pages/login/login';
import { TelaHome } from '@/pages/home/home';
import { TelaHomeOffline } from '@/pages/home/homeoffline/homeoffline';
import { CadastroImoveis } from '@/pages/imoveis/cadastro/cadastro';
import { ListaImoveis } from '@/pages/imoveis/lista/lista';
import { CadastroInquilinos } from '@/pages/inquilinos/cadastro/cadastro';
import { ListaInquilinos } from '@/pages/inquilinos/lista/lista';
import { CadastroSolicitacoes } from '@/pages/solicitacoes/cadastro/cadastro';
import { ListaSolicitacoes } from '@/pages/solicitacoes/lista/lista';
import { CadastroUsuario } from '@/pages/cadastro/cadastro';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // fora do layout
    { path: 'login', component: TelaLogin },
    { path: 'cadastro', component: CadastroUsuario },
    { path: 'homeoffline', component: TelaHomeOffline },
    { path: 'landing', component: Landing },

    // dentro do layout
    {
        path: '',
        component: AppLayout,
        children: [
            { path: 'painel', component: TelaHome },
            { path: 'imoveis', component: ListaImoveis },
            { path: 'imoveis/cadastro', component: CadastroImoveis },
            { path: 'inquilinos', component: ListaInquilinos },
            { path: 'inquilinos/cadastro', component: CadastroInquilinos },
            { path: 'solicitacoes', component: ListaSolicitacoes },
            { path: 'solicitacoes/cadastro', component: CadastroSolicitacoes }
        ]
    },

    { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },

    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: 'login' }
];