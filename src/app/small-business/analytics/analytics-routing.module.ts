import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallAnalyticsComponent } from './components/call/call-analytics.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';

const routes: Routes = [
    {
        path: 'call',
        component: CallAnalyticsComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
