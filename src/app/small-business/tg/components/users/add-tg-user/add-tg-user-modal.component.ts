import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTgUser } from '../models/tg-users.model';

@Component({
    selector: 'app-add-tg-user-modal',
    templateUrl: './add-tg-user-modal.component.html',
})
export class AddTgUserModalComponent implements OnInit {
    @Output() tgUserAdded = new EventEmitter<AddTgUser>();
    tgUserForm: UntypedFormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: UntypedFormBuilder,
    ) {}

    ngOnInit() {
        this.buildItemForm();
    }

    private buildItemForm() {
        this.tgUserForm = new FormGroup({
            name: new FormControl('', Validators.required),
            tgUserName: new FormControl('', Validators.required),
            extension: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
        });
    }

    submitForm() {
        this.tgUserAdded.emit(this.tgUserForm.value);
        this.activeModal.close();
    }
}
