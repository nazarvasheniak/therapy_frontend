import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

@NgModule({
    declarations: [
        SignInComponent,
        ConfirmationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule { }
