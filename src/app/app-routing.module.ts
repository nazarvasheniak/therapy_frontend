import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { ConfirmationComponent } from './auth/components/confirmation/confirmation.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { ProfileComponent } from './cabinet/components/profile/profile.component';
import { LandingComponent } from './main/components/landing/landing.component';
import { MainComponent } from './main/components/main/main.component';
import { SpecialistsComponent } from './specialists/components/specialists/specialists.component';
import { SpecialistComponent } from './specialists/components/specialist/specialist.component';
import { ArticlesComponent } from './articles/components/articles/articles.component';


const routes: Routes = [
	{ path: 'sign-up', component: SignUpComponent },
	{ path: 'sign-in', component: SignInComponent },
	{ path: 'sign-in/confirm', component: ConfirmationComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'landing', component: LandingComponent },
	{ path: '', component: MainComponent },
	{ path: 'specialists', component: SpecialistsComponent },
	{ path: 'specialist', component: SpecialistComponent },
	{ path:'articles', component: ArticlesComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
