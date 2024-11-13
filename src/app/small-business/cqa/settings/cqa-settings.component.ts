import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { CqaSettingsService } from './service/cqa-settings.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CqaFileType } from '../models/cqa.model';
import Swal from 'sweetalert2';
import { CQA_CONFIG } from '../models/test-data';

@Component({
    selector: 'app-cqa-settings',
    templateUrl: './cqa-settings.component.html',
    styleUrls: ['./cqa-settings.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CqaSettingsComponent implements OnInit {
    isAiEnabled;
    cqaMainAudioSrc: any;
    cqaGoodbyeAudioSrc: any;
    inputCqaGoodbye: any;
    inputCqaMain: any;
    uiSwitchComponent;
    constructor(
        private readonly cqaSettingsService: CqaSettingsService,
        private sanitizer: DomSanitizer,
        private changeDetector: ChangeDetectorRef,
    ) {}

    async ngOnInit() {
        this.loadAudioFiles();
    }

    async loadAudioFiles() {
        const cqaConfig = CQA_CONFIG;

        if (cqaConfig) {
            this.isAiEnabled = cqaConfig.aiEnabled;

            if (cqaConfig && cqaConfig.audioFiles.length !== 0) {
                const cqaMain = cqaConfig.audioFiles.find((file) => file.cqaFileType === CqaFileType.cqaMain);

                const cqaGoodbye = cqaConfig.audioFiles.find((file) => file.cqaFileType === CqaFileType.cqaGoodbye);

                await this.getСqaMainVoiceFile(cqaMain.fileId);

                await this.getСqaGoodbyeVoiceFile(cqaGoodbye.fileId);
            }
        }

        this.changeDetector.detectChanges();
    }

    async getСqaMainVoiceFile(fileId: number) {}

    async getСqaGoodbyeVoiceFile(fileId: number) {}

    async onToggleSwitch(uiSwitchComponent: any) {
        if (uiSwitchComponent.checked) {
            Swal.fire({
                title: 'Вы уверены?',
                text: `В случае переключения на AI все ранее загруженные звуковые файлы будут удалены`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Да, изменить!',
                cancelButtonText: 'Отмена',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        this.isAiEnabled = true;
                    } catch (e) {
                        SweetalertService.errorAlert('', 'Ошибка изменения AI');
                    }
                } else {
                    uiSwitchComponent.checked = false;
                    this.isAiEnabled = false;
                    this.loadAudioFiles();
                }
            });

            return;
        } else {
            try {
                this.isAiEnabled = false;
            } catch (e) {
                SweetalertService.errorAlert('', 'Ошибка изменения AI');
            }
        }
    }

    onFileSelected(event: Event, audioType: 'cqa-main' | 'cqa-goodbye') {
        const input = event.target as HTMLInputElement;

        if (input.files && input.files[0]) {
            const selectedFile = input.files[0];

            if (selectedFile.type === 'audio/wav') {
                const file = input.files[0];

                const fileUrl = URL.createObjectURL(file);

                if (audioType === 'cqa-main') {
                    this.inputCqaMain = selectedFile;

                    this.cqaMainAudioSrc = this.sanitizer.bypassSecurityTrustUrl(fileUrl) as SafeUrl;
                } else {
                    this.inputCqaGoodbye = selectedFile;

                    this.cqaGoodbyeAudioSrc = this.sanitizer.bypassSecurityTrustUrl(fileUrl) as SafeUrl;
                }
            } else {
                SweetalertService.errorAlert('', 'Пожалуйста, загрузите файл в формате .wav');
            }
        }
    }

    async onSave() {
        SweetalertService.autoCloseSuccessAlert('', 'Настройки успешно добавлены', 5000);

        this.loadAudioFiles();
    }

    async saveFilesToServer(formData: FormData) {}
}
