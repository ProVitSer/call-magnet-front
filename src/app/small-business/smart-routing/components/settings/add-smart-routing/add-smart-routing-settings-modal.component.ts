import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AddSmartRouting } from '../models/smart-routing.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-add-smart-routing-settings',
    templateUrl: './add-smart-routing-settings-modal.component.html',
})
export class AddSmartRoutingSettingsModalComponent implements OnInit {
    @Output() addSmartRoutingAdded = new EventEmitter<AddSmartRouting>();
    smUserForm: UntypedFormGroup;
    pbxExtensions = ['123'];
    routingServices = '';
    selectedCrmService: number | null = null;
    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: UntypedFormBuilder,
    ) {}

    ngOnInit() {
        this.buildItemForm();
    }

    private buildItemForm() {
        this.smUserForm = new FormGroup({
            name: new FormControl('', Validators.required),
            tgUserName: new FormControl('', Validators.required),
            extension: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
        });
    }

    submitForm() {
        this.addSmartRoutingAdded.emit(this.smUserForm.value);
        this.activeModal.close();
    }

    selectCrmService(serviceId: number) {
        this.selectedCrmService = serviceId;
    }
}
