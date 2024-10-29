import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { GenerateTtsFileService } from './service/generate-tts.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { WizardComponent } from 'angular-archwizard';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListVoicesData } from '../models/tts.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-tts-generate-file',
    templateUrl: './generate-tts.component.html',
    styleUrls: ['./generate-tts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateTtsFileComponent implements OnInit {
    @ViewChild('wizard') wizard: WizardComponent;
    ttsServices = ['yandex', 'sber'];
    ttsFileName = '';
    selectedTtsService: any;
    voiceNames = [];
    selectedVoiceName: any;
    emotions: string[] = [];
    selectedEmotion: string;
    voices: ListVoicesData[];
    synthesisText = '';
    audioFileUrl: SafeUrl | null = null;

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

        const voices = await this.generateTtsFileService.getVoices({ ttsType: this.selectedTtsService });

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

        this.spinner.show(undefined, {
            type: 'square-jelly-box',
            size: 'small',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: false,
        });

        this.generateTtsFileService.convertOnline(formData).subscribe(
            (blob: Blob) => {
                const audioUrl = URL.createObjectURL(blob);
                this.audioFileUrl = this.sanitizer.bypassSecurityTrustUrl(audioUrl) as SafeUrl;
                this.spinner.hide();
                this.ref.detectChanges();
            },
            (error) => {
                SweetalertService.errorAlert('', 'Ошибка при синтезе речи');
            },
        );
    }

    async saveData() {
        const formData = {
            name: this.ttsFileName,
            ttsType: this.selectedTtsService,
            voice: this.selectedVoiceName,
            emotion: this.selectedEmotion,
            text: this.synthesisText,
        };

        this.spinner.show(undefined, {
            type: 'square-jelly-box',
            size: 'small',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: false,
        });

        try {
            await this.generateTtsFileService.convertWithSave(formData);
            this.spinner.hide();
            this.router.navigate(['sm/tts']);
        } catch (e) {
            SweetalertService.errorAlert('', 'Ошибка при сохранение сгенерированного файла');
        }
    }
}
