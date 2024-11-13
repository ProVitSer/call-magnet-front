import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TvcPhonebookComponent } from './phonebook/tvc-phonebook.component';
import { AddTvcPhonebookModalComponent } from './phonebook/add-tvc-phonebook/add-tvc-phonebook-modal.component';
import { TvcMessagesComponent } from './messages/tvc-messages.component';
import { TvcSettingsComponent } from './settings/tvc-settings.component';

const routes: Routes = [
    {
        path: 'phonebook',
        component: TvcPhonebookComponent,
        data: {
            title: 'Телефонная книга',
        },
    },
    {
        path: 'phonebook/add',
        component: AddTvcPhonebookModalComponent,
        data: {
            title: 'Телефонная книга',
        },
    },
    {
        path: 'messages',
        component: TvcMessagesComponent,
        data: {
            title: 'Сообщения',
        },
    },
    {
        path: 'settings',
        component: TvcSettingsComponent,
        data: {
            title: 'Настройки',
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TvcRoutingModule {}
