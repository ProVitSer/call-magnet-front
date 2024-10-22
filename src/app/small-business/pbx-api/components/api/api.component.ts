import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss'],
})
export class ApiComponent {
    activeTab = 'call';
    generalFormSubmitted = false;
    changePasswordFormSubmitted = false;
    alertVisible = true;
    generalForm: UntypedFormGroup;
    apiUrl = `${environment.API_GATEWAY_URL}`;
    constructor() {}

    reloadPage() {
        location.reload();
    }

    setActiveTab(tab) {
        this.activeTab = tab;
    }
}
