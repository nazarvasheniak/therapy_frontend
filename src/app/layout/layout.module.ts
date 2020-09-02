import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AlertComponent } from './alert/alert.component';
import { ReviewScoreComponent } from './review-score/review-score.component';
import { RatingComponent } from './rating/rating.component';
import { LoaderComponent } from './loader/loader.component';

import { NgxMaskModule } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		PaginationComponent,
		AlertComponent,
		LoaderComponent,
		ReviewScoreComponent,
		RatingComponent,
		NotFoundComponent
	],
	imports: [
        BrowserModule,
		RouterModule,
		MatProgressSpinnerModule,
		NgxMaskModule.forRoot()
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		PaginationComponent,
		AlertComponent,
		LoaderComponent,
		ReviewScoreComponent,
		RatingComponent,
		NotFoundComponent,
		MatProgressSpinnerModule,
		NgxMaskModule
	],
	providers: [
		
	],
})
export class LayoutModule { }
