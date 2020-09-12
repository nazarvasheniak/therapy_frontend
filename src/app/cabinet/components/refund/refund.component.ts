import { Component, OnInit } from '@angular/core';
import { AuthService, UsersService } from 'src/app/common/services';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-refund',
	templateUrl: './refund.component.html',
	styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {
    
    public refundForm: FormGroup;
    
    public documentFile: File;
    public selfieFile: File;

    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        private router: Router
    ) {
        
    }

    private initRefundForm() {
        this.refundForm = new FormGroup({
            document: new FormControl(null, [Validators.required]),
            selfie: new FormControl(null, [Validators.required])
        });
    }

    ngOnInit(): void {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (!logged) {
                    this.router.navigate(['/sign-in']);

                    return;
                }

                this.initRefundForm();
            });
    }

    valueChanged(file: File, control: string) {
        this[control] = file;
    }

    valueClear(control: string) {
        this[`${control}File`] = null;

        this.refundForm.controls[control].setValue(null);
    }

    submitRefundForm(form: FormGroup) {
        if (form.invalid) {
            alert('form invalid');

            return;
        }

        this.usersService.userVerification({
            document: this.documentFile,
            selfie: this.selfieFile
        }).subscribe(response => {
            console.log(response);
        });
    }

    normalizeMonth(monthStr: string) {
        return monthStr.replace(".", "").substr(0, 3);
    }
}