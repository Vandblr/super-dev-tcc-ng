import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
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

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'login', component: TelaLogin },
    { path: 'home', component: TelaHome },
    { path: 'homeoffline', component: TelaHomeOffline },
    { path: 'imoveis', component: ListaImoveis },
    { path: 'imoveis/cadastro', component: CadastroImoveis },
    { path:  'inquilinos', component: ListaInquilinos},
    { path: 'inquilinos/cadastro', component: CadastroInquilinos},
    { path: 'solicitacoes', component: ListaSolicitacoes},
    { path: 'solicitacoes/cadastro', component: CadastroSolicitacoes},
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
