import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PbxApiSettingsService } from '../service/pbx-api-settings.service';

@Component({
  selector: 'app-pbx-api-settings',
  templateUrl: './pbx-api-settings.component.html',
  styleUrls: ['./pbx-api-settings.component.scss'],

})
export class PbxApiSettingsComponent  implements OnInit{
    constructor(
        private pbxApiSettingsService: PbxApiSettingsService,
        private router: Router,
        private route: ActivatedRoute
      ) {}


    ngOnInit(): void {
         this.pbxApiSettingsService.getPacConfig().subscribe(
            (settings) => {
                if (settings == null) this.router.navigate(['add'], { relativeTo: this.route });
        },
        (e) => {
            console.error('Ошибка проверки настроек:', e);
        }
    );
    }
  
}
