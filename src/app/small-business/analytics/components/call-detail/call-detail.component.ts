import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { CallDetailsService } from './services/call-detail.service';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { CdrData } from '../cdr/models/cdr-analytics';
import * as d3 from 'd3';

@Component({
    selector: 'app-call-detail',
    templateUrl: './call-detail.component.html',
    styleUrls: ['./call-detail.component.scss', '../../../../../assets/sass/libs/datatables.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CallDetailComponent implements OnInit {
    callId: string | null = null;

    public totalRecords = 0;
    public pageSize = 10;
    public currentPage = 1;
    public rows = [];
    public ColumnMode = ColumnMode;
    public expanded: any = {};
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('tableRowDetails') tableRowDetails: any;
    @ViewChild('tableResponsive') tableResponsive: any;

    private data = {
        name: 'CEO',
        children: [
            {
                name: 'Operation Manager',
                children: [
                    {
                        name: 'Manager I',
                        children: [{ name: 'Worker I' }, { name: 'Worker III' }],
                    },
                    {
                        name: 'Manager II',
                        children: [{ name: 'Worker I' }, { name: 'Worker II' }],
                    },
                    {
                        name: 'Manager III',
                        children: [{ name: 'Worker I' }, { name: 'Worker IV' }],
                    },
                ],
            },
            {
                name: 'Account',
                children: [{ name: 'Receptionist' }, { name: 'Author' }],
            },
        ],
    };

    constructor(
        private spinner: NgxSpinnerService,
        private changeDetector: ChangeDetectorRef,
        private route: ActivatedRoute,
        private readonly callDetailsService: CallDetailsService,
    ) {}

    async ngOnInit(): Promise<void> {
        this.route.paramMap.subscribe(async (params) => {
            this.callId = params.get('id');
            await this.loadCallData(this.callId);
        });
    }

    async loadCallData(callId: string) {
        try {
            const response = await this.callDetailsService.getCallData(callId);

            this.rows = response;

            this.totalRecords = response.length;

            this.changeDetector.detectChanges();
        } catch (e) {
            SweetalertService.errorAlert('', 'Ошибка загрузки данных');
        }
    }

    rowDetailsToggleExpand(row: CdrData) {
        this.tableRowDetails.rowDetail.toggleExpandRow(row);
    }

    toggleExpandRowResponsive(row: CdrData) {
        this.tableResponsive.rowDetail.toggleExpandRow(row);
    }

    async getVoiceFile(row: CdrData) {
        try {
            if (row.recordingUrl) {
                window.URL.revokeObjectURL(row.recordingUrl);
                this.rowDetailsToggleExpand(row);
            }
        } catch (error) {
            SweetalertService.errorAlert('', 'Ошибка при загрузке звукового файла');
        }
    }

    async downloadVoiceFile(row: CdrData) {
        if (row.recordingUrl) {
            const url = row.recordingUrl;
            const filename = url.split('/').pop();

            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.target = '_blank';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            SweetalertService.errorAlert('', 'Url записи вызова не валидна или запись отсутствует на сервере');
        }
    }

    async onPageChange(pageInfo) {}

    onTabChange(event: any) {
        console.log(event.nextId === 2);
        if (event.nextId === 2) {
            this.drawChart();
        }
    }

    private drawChart(): void {
        const svg = d3.select('app-bar-chart').append('svg');
        const width = 800;
        const height = 600;

        svg.attr('width', width).attr('height', height);

        const g = svg.append('g').attr('transform', 'translate(50, 50)');

        const root = d3.hierarchy(this.data);
        const treeLayout = d3.tree().size([height - 100, width - 200]);
        treeLayout(root);

        g.selectAll('.link')
            .data(root.links())
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr(
                'd',
                d3
                    .linkHorizontal()
                    .x((d) => d.y)
                    .y((d) => d.x),
            )
            .attr('fill', 'none')
            .attr('stroke', '#cccccc')
            .attr('stroke-width', 1.5);

        const node = g
            .selectAll('.node')
            .data(root.descendants())
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', (d) => `translate(${d.y},${d.x})`);

        node.append('rect')
            .attr('width', 80)
            .attr('height', 20)
            .attr('y', -10)
            .attr('x', -40)
            .attr('rx', 5)
            .attr('ry', 5)
            .attr('fill', '#ffffff')
            .attr('stroke', '#000000')
            .attr('stroke-width', 1.5);

        node.append('text')
            .attr('dy', '0.35em')
            .attr('text-anchor', 'middle')
            .text((d) => d.data.name);
    }
}
