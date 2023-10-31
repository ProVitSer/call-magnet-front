import { RouteInfo } from './vertical-menu.metadata';

export const ROUTES: RouteInfo[] = [

  { path: '/small-business/dashboard', title: 'Рабочий стол', icon: 'ft-monitor', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [ ] },
  { path: '/small-business/analitic', title: 'Аналитика', icon: 'ft-bar-chart-2', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  { path: '', title: 'CRM', icon: 'ft-layout', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
    { path: '/small-business/crm/settings', title: 'Настройки', icon: 'ft-settings', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ] 
  },
  { path: '/small-business/api', title: '3CX API', icon: 'ft-repeat', class: '', badge: 'Новое', badgeClass: 'badge badge-pill badge-primary float-right mr-1 mt-1', isExternalLink: false, submenu: [] },
  { path: '', title: 'Автообзвон', icon: 'ft-phone-outgoing', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
    { path: '/small-business/auto-dial/create', title: 'Создать', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    { path: '/small-business/auto-dial/tasks', title: 'Задания на обзвон', icon: 'icon-shuffle', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    { path: '/small-business/auto-dial/reports', title: 'Отчеты', icon: 'ft-file-text', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    { path: '/small-business/auto-dial/settings', title: 'Настройки', icon: 'ft-settings', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  ] },
  { path: '', title: 'SMS', icon: 'icon-speech', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
    { path: '/small-business/sms/send', title: 'Отправка', icon: 'icon-share-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    { path: '/small-business/sms/mass-sending', title: 'Массовая рассылка', icon: 'icon-users', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    { path: '/small-business/sms/no-answer-call-sending', title: 'Неотвеченные вызовы', icon: 'icon-call-end', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    { path: '/small-business/sms/statistic', title: 'Статистика', icon: 'ft-align-left', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    { path: '/small-business/sms/settings', title: 'Настройки', icon: 'ft-settings', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  ] },
  { path: '', title: 'Telegram', icon: 'icon-paper-plane', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
    { path: '/small-business/telegram/no-answer-call', title: 'Неотвеченные вызовы', icon: 'icon-call-end', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    { path: '/small-business/telegram/call', title: 'Звонки', icon: 'icon-call-out', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

  ] },
  { path: 'https://icep.omnidesk.ru/', title: 'Поддержка', icon: 'ft-life-buoy', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
];
