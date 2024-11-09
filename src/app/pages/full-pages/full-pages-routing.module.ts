import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { NotificationsPageComponent } from './notifications/notifications-page.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'profile',
                component: UsersProfileComponent,
                data: {
                    title: 'Профиль',
                },
                canActivate: [AuthGuard],
            },
            {
                path: 'notifications',
                component: NotificationsPageComponent,
                data: {
                    title: 'Уведомление',
                },
                canActivate: [AuthGuard],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FullPagesRoutingModule {}
