import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { CqaSettingsService } from './service/cqa-settings.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-cqa-settings',
    templateUrl: './cqa-settings.component.html',
    styleUrls: ['./cqa-settings.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CqaSettingsComponent implements OnInit {
    isAiEnabled = false;
    cqaMainAudioSrc: any;
    cqaGoodbyeAudioSrc: any;

    constructor(
        private readonly cqaSettingsService: CqaSettingsService,
        private sanitizer: DomSanitizer,
    ) {}

    toggleAiEvaluation() {
        if (this.isAiEnabled) {
            this.cqaMainAudioSrc = 'path/to/second-file.wav';
            this.cqaGoodbyeAudioSrc = 'path/to/second-file.wav';
        }
    }

    ngOnInit(): void {
        this.loadAudioFiles();
    }

    loadAudioFiles() {
        this.cqaMainAudioSrc = 'path/to/second-file.wav';
        this.cqaGoodbyeAudioSrc = 'path/to/second-file.wav';
        // this.getAudioFilesFromServer().then((files: { firstFile: string, secondFile: string }) => {
        //   this.firstAudioSrc = files.firstFile || '';
        //   this.secondAudioSrc = files.secondFile || '';
        // });
    }

    onFileSelected(event: Event, audioType: 'cqa-main' | 'cqa-goodbye') {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const fileUrl = URL.createObjectURL(file);

            if (audioType === 'cqa-main') {
                this.cqaMainAudioSrc = this.sanitizer.bypassSecurityTrustUrl(fileUrl) as SafeUrl;
            } else {
                this.cqaGoodbyeAudioSrc = this.sanitizer.bypassSecurityTrustUrl(fileUrl) as SafeUrl;
            }
        }
    }

    async onSave() {
        if (!this.cqaMainAudioSrc || !this.cqaGoodbyeAudioSrc) {
            alert('Необходимо загрузить оба файла перед сохранением');
            return;
        }

        const formData = new FormData();
        formData.append('cqa-main', (document.getElementById('inputCqaMain') as HTMLInputElement).files[0]);
        formData.append('cqa-goodbye', (document.getElementById('inputCqaGoodbye') as HTMLInputElement).files[0]);

        await this.saveFilesToServer(formData);
        this.loadAudioFiles();
    }

    async saveFilesToServer(formData: FormData) {
        console.log('Files are being saved to the server');
    }
}
