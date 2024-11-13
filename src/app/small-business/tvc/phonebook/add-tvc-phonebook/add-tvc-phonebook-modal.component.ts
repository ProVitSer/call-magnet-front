import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-add-tvc-phonebook-modal',
    templateUrl: './add-tvc-phonebook-modal.component.html',
})
export class AddTvcPhonebookModalComponent implements OnInit {
    @Output() tgUserAdded = new EventEmitter<any>();
    public tgUserForm: UntypedFormGroup;

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {
        this.buildItemForm();
    }

    private buildItemForm() {
        this.tgUserForm = new FormGroup({
            name: new FormControl('', Validators.required),
            fio: new FormControl('', Validators.required),
            mobile: new FormControl('', Validators.required),
        });
    }

    submitForm() {
        this.tgUserAdded.emit(this.tgUserForm.value);
        this.activeModal.close();
    }
}
