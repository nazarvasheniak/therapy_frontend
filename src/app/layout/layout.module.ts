import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		PaginationComponent
	],
	imports: [
        BrowserModule,
        RouterModule
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		PaginationComponent
	],
	providers: [
		
	],
})
export class LayoutModule { }
