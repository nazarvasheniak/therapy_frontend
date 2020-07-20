import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/services';
import { Router, ActivatedRoute } from '@angular/router';
import { SignUpRequest } from 'src/app/common/models/request';

declare var $: any;

@Component({
	selector: 'app-signup',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    public isLoading = false;
    public isError = false;
    public errorText: string;

    public signUpForm: FormGroup;

    @ViewChild("firstName") firstName: ElementRef;
    @ViewChild("lastName") lastName: ElementRef;
    @ViewChild("phoneNumber") phoneNumber: ElementRef;
    @ViewChild("email") email: ElementRef;
    @ViewChild("problem") problem: ElementRef;
    @ViewChild("privacy") privacy: ElementRef;

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (logged) {
                    this.router.navigate(['/']);
                }
            });

        this.route.params
            .subscribe(params => {
                if (params['prev'] && params['prev'] == 'sign-in') {
                    window.location.href = `${window.location.origin}/#/sign-up`;
                    window.location.reload();
                }
            });
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

        this.createSignUpForm();
    }

    private createSignUpForm(): void {
        this.signUpForm = new FormGroup({
            firstName: new FormControl(null, [Validators.required]),
            lastName: new FormControl(null, [Validators.required]),
            phoneNumber: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required]),
            problem: new FormControl(null, [Validators.required]),
            privacy: new FormControl(false, [Validators.required])
        });

        $("#phoneNumber").mask("+7 (999) 999-99-99", { autoclear: false });
    }

    public inputEvent(control: string ,event) {
        if (control == "phoneNumber") {
            this.signUpForm.controls['phoneNumber'].setValue(event.target.value);
        }

        this.isError = false;

        setTimeout(() => {
            this.errorText = null;
        }, 300);
    }

    public togglePrivacy() {
        this.privacy.nativeElement.click();

        this.isError = false;

        setTimeout(() => {
            this.errorText = null;
        }, 300);
    }

    private normalizePhoneNumber(value: string): string {
        if (!value) return value;

        return value.replace(/-/g, "").replace(/ /g, "").replace("(", "").replace(")", "");
    }

    isFormValid() {
        const phone = this.normalizePhoneNumber(this.signUpForm.value['phoneNumber']);

        if (!phone) {
            return false;
        }

        if (phone.includes('_')) {
            return false;
        }

        if (this.signUpForm.invalid) {
            return false;
        }

        return true;
    }

    public submit(form: FormGroup) {
        this.isError = false;
        this.isLoading = true;

        const phone = this.normalizePhoneNumber(form.value['phoneNumber']);

        if (!phone) {
            this.isLoading = false;
            return;
        }

        if (phone.includes('_')) {
            this.isLoading = false;
            return;
        }

        const request: SignUpRequest = form.value;
        request.phoneNumber = phone;

        this.authService.signUp(request)
            .subscribe(data => {
                this.isLoading = false;
                
                this.router.navigate(['/sign-in/confirm'], {
                    queryParams: {
                        id: data.userID
                    }
                });
            },
            fail => {
                this.errorText = fail.error.message;
                this.isError = true;
                this.isLoading = false;
            });
    }

    public labelClick(elem) {
        this[elem].nativeElement.focus();
    }
}