import { Injectable } from '@angular/core';
import { FAQMain, FAQ } from '../models/faq.model';

@Injectable()
export class FaqService {
    constructor() {}
    public faqsAnalitic: FAQ[] = [];
    public faqsCRM: FAQ[] = [];
    public faqsApi3CX: FAQ[] = [];
    public faqsKpi: FAQ[] = [];
    public faqsAutoDial: FAQ[] = [];
    public faqsSMS: FAQ[] = [];
    public faqsTelegram: FAQ[] = [];

    public faqmain: FAQMain[] = [
        new FAQMain(0, 'Аналитика', ``, this.faqsAnalitic),
        new FAQMain(1, 'CRM', ``, this.faqsCRM),
        new FAQMain(2, '3CX API', ``, this.faqsApi3CX),
        new FAQMain(3, 'KPI колл-центра', ``, this.faqsKpi),
        new FAQMain(4, 'Автообзвон', ``, this.faqsAutoDial),
        new FAQMain(5, 'SMS', ``, this.faqsSMS),
        new FAQMain(6, 'Telegram', ``, this.faqsTelegram),
    ];
}
