import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoDialSettingsComponent } from './components/settings/settings.component';
import { AutoDialReportsComponent } from './components/reports/reports.component';
import { AutoDialTasksComponent } from './components/tasks/tasks.component';
import { AutoDialCreateComponent } from './components/create/create.component';


const routes: Routes = [
  {
    path: 'create',
    component: AutoDialCreateComponent,
    data: {
      title: 'Создать'
    },
  },
  {
    path: 'settings',
    component: AutoDialSettingsComponent,
    data: {
      title: 'Настройки'
    },
  },
  {
    path: 'reports',
    component: AutoDialReportsComponent,
    data: {
      title: 'Статистика'
    },
  },
  {
    path: 'tasks',
    component: AutoDialTasksComponent,
    data: {
      title: 'Задания на обзвон'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoDialRoutingModule { }
