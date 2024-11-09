import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss'],
})
export class ApiComponent {
    public activeTab = 'call';
    public generalFormSubmitted = false;
    public changePasswordFormSubmitted = false;
    public alertVisible = true;
    public generalForm: UntypedFormGroup;
    public apiUrl = `${environment.API_GATEWAY_URL}/pac`;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}

    reloadPage() {
        location.reload();
    }

    setActiveTab(tab) {
        this.activeTab = tab;
    }
}
