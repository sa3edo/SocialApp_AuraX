import { Routes } from "@angular/router";
import { HomePageComponent } from "./Pages/home-page/home-page.component";

export const HOME_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'Trending',
        pathMatch: 'full',

    },
    {
        path: '',
        component: HomePageComponent,
        children: [
            {
                path: 'Trending',
                loadChildren: () => import('../Feeds/feeds.routes').then(m => m.FEEDS_ROUTES),
            }
        ]
    }

]