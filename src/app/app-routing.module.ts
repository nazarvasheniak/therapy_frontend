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
import { ArticleComponent } from './articles/components/article/article.component';
import { ProfileSpecialistArticlesComponent } from './cabinet-specialist/components/profile-specialist-articles/profile-specialist-articles.component';
import { ProfileSpecialistComponent } from './cabinet-specialist/components/profile-specialist/profile-specialist.component';
import { ProfileSpecialistCreateArticleComponent } from './cabinet-specialist/components/profile-specialist-create-article/profile-specialist-create-article.component';
import { ProfileSpecialistEditArticleComponent } from './cabinet-specialist/components/profile-specialist-edit-article/profile-specialist-edit-article.component';


const routes: Routes = [
	{ path: 'sign-up', component: SignUpComponent },
	{ path: 'sign-in', component: SignInComponent },
	{ path: 'sign-in/confirm', component: ConfirmationComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'profile-specialist', component: ProfileSpecialistComponent },
	{ path: 'profile-specialist/articles', component: ProfileSpecialistArticlesComponent },
	{ path: 'profile-specialist/articles/create', component: ProfileSpecialistCreateArticleComponent },
	{ path: 'profile-specialist/articles/:id', component: ProfileSpecialistEditArticleComponent },
	{ path: 'landing', component: LandingComponent },
	{ path: '', component: MainComponent },
	{ path: 'specialists', component: SpecialistsComponent },
	{ path: 'specialists/:id', component: SpecialistComponent },
	{ path:'articles', component: ArticlesComponent },
	{ path: 'articles/:id', component: ArticleComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
