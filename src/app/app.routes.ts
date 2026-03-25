import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./core/layout/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
        loadChildren: () => import('./core/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'home',
        loadComponent: () => import('./core/layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        loadChildren: () => import('./features/Home/home.routes').then(m => m.HOME_ROUTES)
    },
    {
        path: 'not-found',
        loadComponent: () => import('./core/pages/not-found/not-found.component').then(m => m.NotFoundComponent)
    },
    {
        path: '**',
        redirectTo: "not-found"
        , pathMatch: "full"

    },
];
