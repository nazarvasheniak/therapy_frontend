import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { ConfirmationComponent } from './auth/components/confirmation/confirmation.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { ProfileComponent } from './cabinet/components/profile/profile.component';
import { LandingComponent } from './main/components/landing/landing.component';
import { MainComponent } from './main/components/main/main.component';
import { SpecialistsComponent } from './specialists/components/specialists/specialists.component';
import { SpecialistComponent } from './specialists/components/specialist/specialist.component';
import { ArticlesComponent } from './articles/components/articles/articles.component';
import { ArticleComponent } from './articles/components/article/article.component';
import { ProfileSpecialistArticlesComponent } from './cabinet-specialist/components/profile-specialist-articles/profile-specialist-articles.component';
import { ProfileSpecialistComponent } from './cabinet-specialist/components/profile-specialist/profile-specialist.component';
import { ProfileSpecialistCreateArticleComponent } from './cabinet-specialist/components/profile-specialist-create-article/profile-specialist-create-article.component';
import { ProfileSpecialistEditArticleComponent } from './cabinet-specialist/components/profile-specialist-edit-article/profile-specialist-edit-article.component';
import { ChooseSpecialistComponent } from './cabinet/components/choose-specialist/choose-specialist.component';
import { CreateProblemComponent } from './cabinet/components/create-problem/create-problem.component';
import { CabinetDepositComponent } from './cabinet/components/deposit/deposit.component';
import { ProblemAssetsComponent } from './cabinet/components/problem-assets/problem-assets.component';
import { CabinetPaySpecialistComponent } from './cabinet/components/pay-specialist/pay-specialist.component';
import { CabinetSessionSuccessComponent } from './cabinet/components/session-success/session-success.component';
import { ProfileSpecialistClientsComponent } from './cabinet-specialist/components/profile-specialist-clients/profile-specialist-clients.component';
import { ProfileSpecialistClientComponent } from './cabinet-specialist/components/profile-specialist-client/profile-specialist-client.component';
import { ProfileSpecialistSessionsComponent } from './cabinet-specialist/components/profile-specialist-sessions/profile-specialist-sessions.component';
import { ProfileSpecialistReviewsComponent } from './cabinet-specialist/components/profile-specialist-reviews/profile-specialist-reviews.component';
import { ProfileSpecialistProblemAssetsComponent } from './cabinet-specialist/components/profile-specialist-problem-assets/profile-specialist-problem-assets.component';
import { AuthService, LoaderService } from './common/services';
import { Observable } from 'rxjs';

@Injectable()
export class LoaderGuard implements CanActivate {
	constructor(private loaderService: LoaderService, private router: Router) { };

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return new Promise<boolean>((resolve, reject) => {
			this.loaderService.next(true);
			
			setTimeout(() => resolve(true), 100);
		});
	}
}

const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		canActivate: [LoaderGuard]
	},

	{
		path: 'sign-up',
		component: SignUpComponent
	},
	{ path: 'sign-in', component: SignInComponent },
	{ path: 'sign-in/confirm', component: ConfirmationComponent },

	{ path: 'landing', component: LandingComponent },

	{ path: 'articles', component: ArticlesComponent, canActivate: [LoaderGuard] },
	{ path: 'articles/:id', component: ArticleComponent, canActivate: [LoaderGuard] },

	{
		path: 'specialists',
		component: SpecialistsComponent,
		canActivate: [LoaderGuard]
	},

	{
		path: 'specialists/:id',
		component: SpecialistComponent,
		canActivate: [LoaderGuard]
	},

	{ path: 'profile', component: ProfileComponent, canActivate: [LoaderGuard] },
	{ path: 'profile/deposit', component: CabinetDepositComponent, canActivate: [LoaderGuard] },
	{ path: 'profile/problems/:id/choose-specialist', component: ChooseSpecialistComponent, canActivate: [LoaderGuard] },
	{ path: 'profile/problems/:id/choose-specialist/:specialistID/pay', component: CabinetPaySpecialistComponent, canActivate: [LoaderGuard] },
	{ path: 'profile/problems/:id/assets', component: ProblemAssetsComponent, canActivate: [LoaderGuard] },
	{ path: 'profile/problems/:id/sessions/:sessionID/review', component: CabinetSessionSuccessComponent, canActivate: [LoaderGuard] },
	{ path: 'profile/problems/add', component: CreateProblemComponent, canActivate: [LoaderGuard] },

	{ path: 'profile-specialist', component: ProfileSpecialistComponent, canActivate: [LoaderGuard] },
	{ path: 'profile-specialist/articles', component: ProfileSpecialistArticlesComponent, canActivate: [LoaderGuard] },
	{ path: 'profile-specialist/articles/create', component: ProfileSpecialistCreateArticleComponent, canActivate: [LoaderGuard] },
	{ path: 'profile-specialist/articles/:id', component: ProfileSpecialistEditArticleComponent, canActivate: [LoaderGuard] },
	{ path: 'profile-specialist/clients', component: ProfileSpecialistClientsComponent, canActivate: [LoaderGuard] },
	{ path: 'profile-specialist/clients/:id', component: ProfileSpecialistClientComponent, canActivate: [LoaderGuard] },
	{ path: 'profile-specialist/sessions', component: ProfileSpecialistSessionsComponent, canActivate: [LoaderGuard] },
	{ path: 'profile-specialist/reviews', component: ProfileSpecialistReviewsComponent, canActivate: [LoaderGuard] },
	{ path: 'profile-specialist/clients/:clientID/problems/:problemID/assets', component: ProfileSpecialistProblemAssetsComponent, canActivate: [LoaderGuard] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: false })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
