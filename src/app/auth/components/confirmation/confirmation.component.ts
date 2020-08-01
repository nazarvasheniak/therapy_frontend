import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';
import { UserRole } from 'src/app/common/enums';

@Component({
	selector: 'app-auth-confirmation',
	templateUrl: './confirmation.component.html',
	styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, AfterViewInit {

    public isLoading = false;
    public isError = false;
    public errorText: string;
    public secondsToResend = 30;
    public isResendAllowed = false;

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
                    this.router.navigate(['/']);

                    return;
                }

                this.userID = Number(params['id']);
                this.updateTimer();
            });
    }
    
    updateTimer() {
        setInterval(() => {
            if (this.secondsToResend != 0) {
                this.secondsToResend -= 1;
            }

            if (this.secondsToResend > 0) {
                this.isResendAllowed = false;

                return;
            }

            if (this.secondsToResend == 0) {
                this.isResendAllowed = true;

                return;
            }
        }, 1000);
    }

    ngOnInit(): void {
        if (window.innerWidth <= 450) {
            document.body.style.background = "#335C65";
        } else {
            document.body.style.background = "#254951";
        }

        window.onresize = () => {
            if (window.innerWidth <= 450) {
                document.body.style.background = "#335C65";
            } else {
                document.body.style.background = "#254951";
            }
        }

        this.createConfirmAuthForm();
    }

    ngAfterViewInit() {
        this.digit1.nativeElement.focus();
    }

    private createConfirmAuthForm(): void {
        this.confirmAuthForm = new FormGroup({
            digit1: new FormControl(null, [Validators.required]),
            digit2: new FormControl(null, [Validators.required]),
            digit3: new FormControl(null, [Validators.required]),
            digit4: new FormControl(null, [Validators.required])
        });
    }

    public resendConfirmation() {
        this.authService.resendConfirmCode({ userID: this.userID })
            .subscribe(() => {
                this.isResendAllowed = false;
                this.secondsToResend = 30;
            });
    }

    public submit(form: FormGroup) {
        if (this.isLoading) {
            return;
        }

        this.isLoading = true;

        if (form.invalid) {
            this.isLoading = false;

            return;
        }

        const code = `${form.value['digit1']}${form.value['digit2']}${form.value['digit3']}${form.value['digit4']}`;

        this.authService.signInConfirm({
            userID: this.userID,
            code: code
        })
        .subscribe(data => {
            this.isError = false;
            this.isLoading = false;
            
            if (data.role == UserRole.Specialist) {
                this.router.navigate(['/profile-specialist']);

                return;
            }
            
            this.router.navigate(['/profile']);
        },
        fail => {
            this.errorText = fail.error.message;
            this.isError = true;
            this.isLoading = false;
        });
    }
    
    public backToAuth() {
        this.router.navigate(['/sign-in']);
    }

    public nextDigit(event, currentDigit: number) {
        if (this.confirmAuthForm.valid) {
            this.submit(this.confirmAuthForm);
        } else {
            this.isError = false;
        }

        let keyNumber = null;
        
        if (event.key != 'e' && event.key != ',' && event.key != '.') {
            keyNumber = parseInt(event.key);
        } else {
            keyNumber = null;
        }

        if (currentDigit > 0 && currentDigit < 4) {
            if (keyNumber) {
                this.confirmAuthForm.controls[`digit${currentDigit}`].setValue(keyNumber);
                this[`digit${currentDigit + 1}`].nativeElement.focus();

                return;
            } else if (keyNumber == NaN || keyNumber == null) {
                this.confirmAuthForm.controls[`digit${currentDigit}`].setValue(null);

                return;
            }
        }

        if (currentDigit > 1 && currentDigit < 5) {
            if (event.key == "Backspace") {
                this.confirmAuthForm.controls[`digit${currentDigit}`].setValue(null);
                this[`digit${currentDigit - 1}`].nativeElement.focus();

                return;
            }
        }

        if (currentDigit == 4) {
            if (keyNumber) {
                this.confirmAuthForm.controls[`digit${currentDigit}`].setValue(keyNumber);

                return;
            } else if (keyNumber == NaN || keyNumber == null) {
                this.confirmAuthForm.controls[`digit${currentDigit}`].setValue(null);

                return;
            }
        }

        if (currentDigit == 4) {
            if (event.key == "Backspace") {
                this.confirmAuthForm.controls[`digit${currentDigit}`].setValue(null);
                this[`digit${currentDigit - 1}`].nativeElement.focus();

                return;
            }
        }
    }
}