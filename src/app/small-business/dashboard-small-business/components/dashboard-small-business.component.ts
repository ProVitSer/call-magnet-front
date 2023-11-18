import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardRequestService } from '../services/dashboard-request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-dashboard-small-business',
  templateUrl: './dashboard-small-business.component.html',
  styleUrls: ['./dashboard-small-business.component.scss']
})

export class DashboardSmallBusinessComponent implements OnInit, OnDestroy {
  ngDestroy$ = new Subject();
constructor(private router: Router,private route: ActivatedRoute,private dashboardRequestService: DashboardRequestService){}

  ngOnInit(): void {
     this.dashboardRequestService.test().subscribe((res) => {
      console.log()
     })
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
    this.ngDestroy$.complete();
  }


}