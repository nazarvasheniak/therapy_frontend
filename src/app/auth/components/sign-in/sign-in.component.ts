import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services';

declare var $: any;

@Component({
	selector: 'app-signin',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    public signInForm: FormGroup;

    constructor(private authService: AuthService) {

    }

    ngOnInit(): void {
        $("#phone").mask("+7 (999) 999-99-99");

        this.createSignInForm();
    }

    private createSignInForm(): void {
        this.signInForm = new FormGroup({
            phone: new FormControl(null, [Validators.required])
        });
    }

    public inputEvent(event) {
        this.signInForm.controls['phone'].setValue(event.target.value);
    }

    public submit(form: FormGroup): void {
        const phone = this.normalizePhoneNumber(form.value['phone']);

        if (!phone) {
            alert('error');
            return;
        }

        if (phone.includes('_')) {
            alert('length error');
            return;
        }

        this.authService
            .signIn({
                phoneNumber: phone
            })
            .subscribe(
                data => {
                    alert(data.message);
                    return;
                },
                fail => {
                    alert(fail.error.message);
                    return;
                }
            )
    }

    private normalizePhoneNumber(value: string): string {
        if (!value) return value;

        return value.replace(/-/g, "").replace(/ /g, "").replace("(", "").replace(")", "");
    }
}
