import { Routes } from '@angular/router';

export const Full_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../../pages/full-pages/full-pages.module').then((m) => m.FullPagesModule),
    },
];
