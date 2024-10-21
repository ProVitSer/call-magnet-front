import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PbxApiSettingsService } from '../service/pbx-api-settings.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SweetalertService } from 'app/shared/services/sweetalert.service';

@Component({
  selector: 'app-pbx-api-add-settings',
  templateUrl: './pbx-api-add-settings.component.html',
  styleUrls: ['./pbx-api-add-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PbxApiAddSettingsComponent implements  OnInit {
    selectedOS: string;
    addPacConfig: boolean = false;
    pacIp: string = '';
    pacPort: string = '';

    constructor(
        public router: Router, 
        private ref: ChangeDetectorRef,
        private readonly pbxApiSettingsService: PbxApiSettingsService,
        private spinner: NgxSpinnerService,
    ){ }
    ngOnInit(): void {

    }

    ngAfterViewInit() {
    setTimeout(() => {
      this.ref.detectChanges();
    }, 100);

  }

  addEndCheckConnection() {
    const data = {
        ip: this.pacIp,
        port: Number(this.pacPort)
      };


    this.addPacConfig = true;

    this.spinner.show(undefined,
        {
          type: 'square-jelly-box',
          size: 'small',
          bdColor: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          fullScreen: false
    });

    this.pbxApiSettingsService.addPacConfig(data).subscribe(
        (res: void) => {
            this.addPacConfig = false;
        },
        (e) => {
            this.spinner.hide();
            SweetalertService.errorAlert('Ошибка подключения', e.error.error)
      })

  }



  downloadInstaller(os: string) {
    
    this.spinner.show(undefined,
        {
          type: 'square-jelly-box',
          size: 'small',
          bdColor: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          fullScreen: false
    });
    this.pbxApiSettingsService.getPacProgramm(os).add(() => {
        this.spinner.hide();
    });  
    }
  
}
