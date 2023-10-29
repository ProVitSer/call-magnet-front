import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent {
    @ViewChild('f') forogtPasswordForm: NgForm;

    constructor(private router: Router,
        private route: ActivatedRoute) { }

    onSubmit() {
        this.forogtPasswordForm.reset();
    }

    onLogin() {
        this.router.navigate(['login'], { relativeTo: this.route.parent });
    }

    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}
