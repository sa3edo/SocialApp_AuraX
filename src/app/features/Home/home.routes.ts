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
                loadComponent() {
                    return import('../Feeds/feed/feed.component').then(m => m.FeedComponent);
                },
            },
            {
                path: 'My-Posts',
                loadComponent() {
                    return import('../My-Posts/pages/my-post-page/my-post-page.component').then(m => m.MyPostPageComponent);
                },
            }
        ]
    }

]