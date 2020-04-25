import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { ConfirmationComponent } from './auth/components/confirmation/confirmation.component';


const routes: Routes = [
	{ path: 'sign-in', component: SignInComponent },
	{ path: 'sign-in/confirm', component: ConfirmationComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
