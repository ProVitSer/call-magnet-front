import { Injectable } from '@angular/core';
import { FAQMain, FAQ } from '../models/faq.model';

@Injectable()
export class FaqService {
    constructor() {}
    public faqsAnalitic: FAQ[] = [
        new FAQ('f1', 'Widgets', ''),
        new FAQ('f2', 'Графики', ''),
        new FAQ('f3', 'Статистика по добавочным', ''),
        new FAQ('f4', 'Cdr', ''),
        new FAQ('f4', 'Статистика', ''),
        new FAQ('f4', 'Аналитика звонка', ''),
        new FAQ('f4', 'Диаграмма вызова', ''),
        new FAQ('f4', 'Распознавание диалога', ''),
    ];
    public faqsCRM: FAQ[] = [];
    public faqsApi3CX: FAQ[] = [];
    public faqsKpi: FAQ[] = [];
    public faqsSmartRouting: FAQ[] = [];
    public faqsSMS: FAQ[] = [];
    public faqsTelegram: FAQ[] = [];
    public faqsMissedCall: FAQ[] = [];
    public faqsTts: FAQ[] = [];
    public faqsVoip: FAQ[] = [];

    public faqmain: FAQMain[] = [
        new FAQMain(0, 'Аналитика', ``, this.faqsAnalitic),
        new FAQMain(1, '3CX API', ``, this.faqsApi3CX),
        new FAQMain(2, 'Умная маршрутизация', ``, this.faqsSmartRouting),
        new FAQMain(3, 'Пропущенные вызовы', ``, this.faqsMissedCall),
        new FAQMain(4, 'KPI колл-центра', ``, this.faqsKpi),
        new FAQMain(5, 'Синтез речи', ``, this.faqsTts),
        new FAQMain(6, 'SMS', ``, this.faqsSMS),
        new FAQMain(7, 'CRM', ``, this.faqsCRM),
        new FAQMain(8, 'Telegram', ``, this.faqsTelegram),
        new FAQMain(9, 'VoIP мост', ``, this.faqsVoip),
    ];
}
