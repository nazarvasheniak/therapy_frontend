import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { NgxMaskModule } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        SignUpComponent,
        SignInComponent,
        ConfirmationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        RecaptchaModule,
        MatProgressSpinnerModule,
        NgxMaskModule.forRoot(),
    ],
    providers: [
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: { siteKey: '6LeUMK8ZAAAAAKam4hulJvhY4WTnPkZYltdJzUWK' } as RecaptchaSettings,
        },
    ]
})
export class AuthModule { }
