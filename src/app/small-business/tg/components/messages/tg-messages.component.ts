import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
    selector: 'app-tg-messages',
    templateUrl: './tg-messages.component.html',
    styleUrls: ['./tg-messages.component.scss', '../../../../../assets/sass/libs/datatables.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TgMessagesComponent {
    public rows = [
        {
            id: 1,
            avatar: 'avatar-s-1.png',
            status: 1,
            userName: 'VitProkin',
            message: 'У вас пропущенный звонок от абонента +74991136033. Для того чтобы перезвонить, нажмите кнопку ниже.',
            tgUserId: '213123',
        },
    ];

    public ColumnMode = ColumnMode;
    public expanded: any = {};

    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('tableRowDetails') tableRowDetails: any;
    @ViewChild('tableResponsive') tableResponsive: any;

    rowDetailsToggleExpand(row) {
        this.tableRowDetails.rowDetail.toggleExpandRow(row);
    }

    toggleExpandRowResponsive(row) {
        this.tableResponsive.rowDetail.toggleExpandRow(row);
    }
}
