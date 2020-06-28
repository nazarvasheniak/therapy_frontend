import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/services';
import { Router } from '@angular/router';
import { SignUpRequest } from 'src/app/common/models/request';

declare var $: any;

@Component({
	selector: 'app-signup',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    public isLoading = false;

    public signUpForm: FormGroup;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (logged) {
                    this.router.navigate(['/']);
                }
            });
    }

    ngOnInit(): void {
        this.createSignUpForm();
    }

    private createSignUpForm(): void {
        this.signUpForm = new FormGroup({
            firstName: new FormControl(null, [Validators.required]),
            lastName: new FormControl(null, [Validators.required]),
            phoneNumber: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required]),
            problem: new FormControl(null, [Validators.required])
        });

        $("#phoneNumber").mask("+7 (999) 999-99-99", { autoclear: false });
    }

    public inputEvent(event) {
        this.signUpForm.controls['phoneNumber'].setValue(event.target.value);
    }

    private normalizePhoneNumber(value: string): string {
        if (!value) return value;

        return value.replace(/-/g, "").replace(/ /g, "").replace("(", "").replace(")", "");
    }

    public submit(form: FormGroup) {
        this.isLoading = true;

        const phone = this.normalizePhoneNumber(form.value['phoneNumber']);

        if (!phone) {
            alert('error');
            this.isLoading = false;
            return;
        }

        if (phone.includes('_')) {
            alert('length error');
            this.isLoading = false;
            return;
        }

        const request: SignUpRequest = form.value;
        request.phoneNumber = phone;

        this.authService.signUp(request)
            .subscribe(res => {
                if (!res.success) {
                    alert(res.message);
                    this.isLoading = false;

                    return;
                }
                
                this.isLoading = false;
                this.router.navigate(['/sign-in']);
            });
    }
}