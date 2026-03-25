import { Routes } from "@angular/router";

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadComponent: () => import('./pages/auth-page/auth-page.component').then(m => m.AuthPageComponent),
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                loadComponent: () => import('./components/login-form/login-form.component').then(m => m.LoginFormComponent)
            },
            {
                path: 'signup',
                loadComponent: () => import('./components/signup-form/signup-form.component').then(m => m.SignupFormComponent)
            }
        ]

    },

] 