import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AlertComponent } from './alert/alert.component';
import { ReviewScoreComponent } from './review-score/review-score.component';
import { RatingComponent } from './rating/rating.component';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		PaginationComponent,
		AlertComponent,
		ReviewScoreComponent,
		RatingComponent
	],
	imports: [
        BrowserModule,
        RouterModule
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		PaginationComponent,
		AlertComponent,
		ReviewScoreComponent,
		RatingComponent
	],
	providers: [
		
	],
})
export class LayoutModule { }
