import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTvcPhonebookModalComponent } from './add-tvc-phonebook/add-tvc-phonebook-modal.component';
import Swal from 'sweetalert2';
import { USERS } from './test-data';

@Component({
    selector: 'app-tvc-phonebook',
    templateUrl: './tvc-phonebook.component.html',
    styleUrls: ['./tvc-phonebook.component.scss', '../../../../assets/sass/libs/datatables.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TvcPhonebookComponent implements OnInit, AfterViewInit {
    public rows = [];
    public totalRecords = 0;
    public pageSize = 10;
    public currentPage = 1;
    public ColumnMode = ColumnMode;
    public expanded: any = {};
    private rowsTemp = [];
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('tableTgUsers') tableTgUsers: any;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private modalService: NgbModal,
    ) {
        this.rowsTemp = this.rows;
    }

    ngOnInit() {}

    ngAfterViewInit() {
        this.getUsers();
    }
    async getUsers() {
        try {
            const response = USERS;

            this.rows = response.data;

            this.rowsTemp = response.data;

            this.totalRecords = response.totalRecords;
            this.changeDetector.detectChanges();
        } catch (e) {
            SweetalertService.errorAlert('', 'Ошибка загрузки данных');
        }
    }

    rowDetailsToggleExpand(row) {
        this.tableTgUsers.rowDetail.toggleExpandRow(row);
    }

    toggleExpandRowResponsive(row) {
        this.tableTgUsers.rowDetail.toggleExpandRow(row);
    }

    async MultiPurposeFilterUpdate(event) {
        const val = event.target.value.toLowerCase();

        const response = USERS;

        this.rows = response.data;
        this.rowsTemp = response.data;
        this.totalRecords = response.totalRecords;

        this.changeDetector.detectChanges();

        const temp = this.rowsTemp.filter(function (d) {
            return d.externalNumber.toLowerCase().indexOf(val) !== -1;
        });

        this.rows = temp;
        this.table.offset = 0;
    }

    onPageChange(pageInfo) {
        this.currentPage = pageInfo.offset + 1;
        this.getUsers();
    }

    async onDelete(row: any) {
        Swal.fire({
            title: 'Вы уверены?',
            text: `Вы хотите удалить пользователя ${row.fio}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да, удалить!',
            cancelButtonText: 'Отмена',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    Swal.fire('Удалено!', `Пользователь ${row.fio} был успешно удален.`, 'success');

                    this.getUsers();
                } catch (e) {
                    SweetalertService.errorAlert('', 'Ошибка удаления пользователя');
                }
            }
        });
    }
    async onAddUser() {
        const modalRef = this.modalService.open(AddTvcPhonebookModalComponent);
        modalRef.componentInstance.tgUserAdded.subscribe(async (userData: any) => {
            try {
                this.getUsers();
            } catch (e) {
                SweetalertService.errorAlert('', 'Ошибка добавления пользователя');
            }
        });
    }

    async updateExtension(row: any, field: string) {
        const extension = row[field];

        const id = row['id'];

        row.editing = false;
    }

    async updateName(row: any, field: string) {
        const name = row[field];

        const id = row['id'];

        row.editing = false;
    }
}
