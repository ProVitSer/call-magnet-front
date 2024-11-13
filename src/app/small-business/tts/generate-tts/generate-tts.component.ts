import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { GenerateTtsFileService } from './service/generate-tts.service';
import { Router } from '@angular/router';
import { WizardComponent } from 'angular-archwizard';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListVoicesData } from '../models/tts.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { VOICES_SBER, VOICES_YANDEX } from '../models/test-data';

@Component({
    selector: 'app-tts-generate-file',
    templateUrl: './generate-tts.component.html',
    styleUrls: ['./generate-tts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateTtsFileComponent implements OnInit {
    @ViewChild('wizard') wizard: WizardComponent;
    public ttsServices = ['yandex', 'sber'];
    public ttsFileName = '';
    public selectedTtsService: any;
    public voiceNames = [];
    public selectedVoiceName: any;
    public emotions: string[] = [];
    public selectedEmotion: string;
    public voices: ListVoicesData[];
    public synthesisText = '';
    public audioFileUrl: SafeUrl | null = null;

    constructor(
        private readonly generateTtsFileService: GenerateTtsFileService,
        private router: Router,
        private spinner: NgxSpinnerService,
        private ref: ChangeDetectorRef,
        private sanitizer: DomSanitizer,
    ) {}

    ngOnInit(): void {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.ref.detectChanges();
        }, 100);
    }

    async onServiceSelect() {
        this.audioFileUrl = null;

        this.voices = [];

        const voices = this.selectedTtsService == 'yandex' ? VOICES_YANDEX : VOICES_SBER;

        this.voices = voices;

        this.voiceNames = voices.map((v) => v.name);

        this.selectedVoiceName = null;

        this.emotions = [];
    }

    onVoiceNameSelect() {
        this.audioFileUrl = null;

        const selectedVoice = this.voices.find((v) => v.name === this.selectedVoiceName);

        this.emotions = selectedVoice ? selectedVoice.emotions : [];
    }

    async synthesize() {
        const formData = {
            name: this.ttsFileName,
            ttsType: this.selectedTtsService,
            voice: this.selectedVoiceName,
            emotion: this.selectedEmotion,
            text: this.synthesisText,
        };

        this.showSpinner();

        this.hideSpinner();
        this.ref.detectChanges();
    }

    async saveData() {
        const formData = {
            name: this.ttsFileName,
            ttsType: this.selectedTtsService,
            voice: this.selectedVoiceName,
            emotion: this.selectedEmotion,
            text: this.synthesisText,
        };

        this.showSpinner();

        try {
            this.hideSpinner();
            this.router.navigate(['sm/tts']);
        } catch (e) {
            SweetalertService.errorAlert('', 'Ошибка при сохранении сгенерированного файла');
        }
    }

    private showSpinner() {
        this.spinner.show(undefined, {
            type: 'square-jelly-box',
            size: 'small',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: false,
        });
    }

    private hideSpinner() {
        this.spinner.hide();
    }
}
