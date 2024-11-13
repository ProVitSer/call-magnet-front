import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { TtsFilesComponent } from './files/tts-files.component';
import { GenerateTtsFileComponent } from './generate-tts/generate-tts.component';

const routes: Routes = [
    {
        path: '',
        component: TtsFilesComponent,
        data: {
            title: 'Генерация текста в речь',
        },
    },
    {
        path: 'convert',
        component: GenerateTtsFileComponent,
        data: {
            title: 'Генерация текста в речь',
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TtsRoutingModule {}
