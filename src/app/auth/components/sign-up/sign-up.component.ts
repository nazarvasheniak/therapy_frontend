import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-signup',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    public signUpForm: FormGroup;

    constructor() {

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
    }

    public submit(form: FormGroup) {
        
    }
}