import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [
		HeaderComponent
	],
	imports: [
        BrowserModule,
        RouterModule
	],
	exports: [
		HeaderComponent
	],
	providers: [
		
	],
})
export class LayoutModule { }
