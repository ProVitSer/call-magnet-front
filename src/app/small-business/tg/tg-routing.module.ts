import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { TgUsersComponent } from './components/users/tg-users.component';
import { TgSettingsComponent } from './components/settings/tg-settings.component';
import { TgMessagesComponent } from './components/messages/tg-messages.component';
import { TgAddSettingsComponent } from './components/settings/add-settings/tg-add-settings.component';

const routes: Routes = [
    {
        path: 'users',
        component: TgUsersComponent,
        data: {
            title: 'Пользователи telegram',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'settings',
        component: TgSettingsComponent,
        data: {
            title: 'Настройки telegram',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'settings/add',
        component: TgAddSettingsComponent,
        data: {
            title: 'Настройки telegram',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'messages',
        component: TgMessagesComponent,
        data: {
            title: 'Сообщения',
        },
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TgRoutingModule {}
