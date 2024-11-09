import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { CONTENT_ROUTES } from './shared/routes/content-layout.routes';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { SM_ROUTES } from './small-business/small-business-routing.module';
import { Full_ROUTES } from './shared/routes/full-layout.routes';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    { path: 'sm', component: FullLayoutComponent, data: { title: '' }, children: SM_ROUTES, canActivate: [AuthGuard] },
    { path: '', component: ContentLayoutComponent, data: { title: 'content' }, children: CONTENT_ROUTES },
    { path: '', component: FullLayoutComponent, data: { title: 'Профиль' }, children: Full_ROUTES },
    {
        path: '**',
        redirectTo: 'error',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy', useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
