import { Routes } from '@angular/router';

export const Full_ROUTES: Routes = [
    {
        path: 'small-business',
        loadChildren: () => import('../../small-business/small-business.module').then(m => m.SmallBusinessModule),
        data: { expectedRole: ['SmallBusiness'] }

      },
];
