import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
	selector: 'app-auth-confirmation',
	templateUrl: './confirmation.component.html',
	styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

    public isLoading = false;

    @ViewChild("digit1") digit1: ElementRef;
    @ViewChild("digit2") digit2: ElementRef;
    @ViewChild("digit3") digit3: ElementRef;
    @ViewChild("digit4") digit4: ElementRef;

    public confirmAuthForm: FormGroup;
    public userID: number;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService
    ) {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (logged) {
                    this.router.navigate(['/']);
                }
            });

        this.activatedRoute.queryParams
            .subscribe(params => {
                if (!params['id']) {
                    alert('id error');
                    return;
                }

                this.userID = Number(params['id']);
            });
    }

    ngOnInit(): void {
        this.createConfirmAuthForm();
    }

    private createConfirmAuthForm(): void {
        this.confirmAuthForm = new FormGroup({
            digit1: new FormControl(null, [Validators.required]),
            digit2: new FormControl(null, [Validators.required]),
            digit3: new FormControl(null, [Validators.required]),
            digit4: new FormControl(null, [Validators.required])
        });
    }

    public submit(form: FormGroup) {
        this.isLoading = true;

        if (form.invalid) {
            alert("Заполните все поля");
            this.isLoading = false;
            return;
        }

        const code = `${form.value['digit1']}${form.value['digit2']}${form.value['digit3']}${form.value['digit4']}`;

        this.authService.signInConfirm({
            userID: this.userID,
            code: code
        })
        .subscribe(result => {
            if (result.success) {
                this.router.navigate(['/']);
            }
        });
    }
    
    public backToAuth() {
        this.router.navigate(['/sign-in']);
    }

    public nextDigit(event, currentDigit: number) {
        switch (currentDigit) {
            case 1:
                if (!event.target.value) {
                    this.digit1.nativeElement.focus();
                    break;
                } else {
                    this.digit2.nativeElement.focus();
                    break;
                }
            
            case 2:
                if (!event.target.value) {
                    this.digit1.nativeElement.focus();
                    break;
                } else {
                    this.digit3.nativeElement.focus();
                    break;
                }

            case 3:
                if (!event.target.value) {
                    this.digit2.nativeElement.focus();
                    break;
                } else {
                    this.digit4.nativeElement.focus();
                    break;
                }

            case 4:
                if (!event.target.value) {
                    this.digit3.nativeElement.focus();
                    break;
                }
        }
    }
}