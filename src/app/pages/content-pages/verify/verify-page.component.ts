import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthRequestService } from 'app/shared/auth/auth-request.service';
import { VerifyUserResponse } from 'app/shared/models/auth';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { UtilService } from 'app/shared/services/util.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-verify-page',
    templateUrl: './verify-page.component.html',
    styleUrls: ['./verify-page.component.scss'],
})
export class VerifyPageComponent implements OnInit, OnDestroy {
    private ngDestroy$ = new Subject();
    private verificationCode: string;
    private redirectTimeout = 10000;
    constructor(
        private router: Router,
        private authRequestService: AuthRequestService,
        private spinner: NgxSpinnerService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.verificationCode = params['id'];

            if (!UtilService.isUUIDv4(this.verificationCode)) {
                return SweetalertService.errorAlert('', 'Некорректная ссылка');
            }

            this.spinner.show(undefined, {
                type: 'ball-triangle-path',
                size: 'medium',
                bdColor: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                fullScreen: true,
            });

            this.verifyUser(this.verificationCode);
        });
    }

    ngOnDestroy(): void {
        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    private verifyUser(verificationCode: string) {
        this.spinner.hide();

        SweetalertService.autoCloseSuccessAlert('', 'Сейчас вы будите перенаправлены на страницу автовризации', this.redirectTimeout);

        setTimeout(() => {
            this.router.navigate(['/login']);
        }, this.redirectTimeout);
    }
}
