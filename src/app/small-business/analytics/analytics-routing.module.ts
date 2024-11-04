import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallsAnalyticsComponent } from './components/calls/calls-analytics.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { CdrAnalyticsComponent } from './components/cdr/cdr-analytics.component';

const routes: Routes = [
    {
        path: 'calls',
        component: CallsAnalyticsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'cdr',
        component: CdrAnalyticsComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
