import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';

declare var $: any;

@Component({
	selector: 'app-signin',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    public isLoading = false;
    public isPhoneValid = false;

    @ViewChild("phone") phone: ElementRef;

    public signInForm: FormGroup;

    constructor(
        private authService: AuthService,
        private router: Router) {
            
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (logged) {
                    this.router.navigate(['/']);
                }
            });
    }

    ngOnInit(): void {
        this.createSignInForm();
    }

    private createSignInForm(): void {
        this.signInForm = new FormGroup({
            phone: new FormControl(null, [Validators.required])
        });

        $("#phone").mask("+7 (999) 999-99-99", { autoclear: false });
    }

    public inputEvent(event) {
        this.signInForm.controls['phone'].setValue(event.target.value);

        if (this.isValidPhoneNumber(this.normalizePhoneNumber(this.signInForm.value['phone']))) {
            this.isPhoneValid = true;
        } else {
            this.isPhoneValid = false;
        }
    }

    isValidPhoneNumber(value: string) {
        if (!value)
            return false;

        if (value.includes('_'))
            return false;

        return true;
    }

    public submit(form: FormGroup): void {
        this.isLoading = true;

        const phone = this.normalizePhoneNumber(form.value['phone']);

        if (!this.isValidPhoneNumber(phone)) {
            alert('error');
            this.isLoading = false;
            return;
        }

        this.authService
            .signIn({
                phoneNumber: phone
            })
            .subscribe(
                data => {
                    this.router.navigate(['/sign-in/confirm'], {
                        queryParams: {
                            id: data.userID
                        }
                    });
                    return;
                },
                fail => {
                    alert(fail.error.message);
                    this.isLoading = false;
                    return;
                }
            )
    }

    private normalizePhoneNumber(value: string): string {
        if (!value) return value;

        return value.replace(/-/g, "").replace(/ /g, "").replace("(", "").replace(")", "");
    }

    public labelClick() {
        this.phone.nativeElement.focus();
    }
}
