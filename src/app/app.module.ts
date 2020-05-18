import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CabinetModule } from './cabinet/cabinet.module';
import { MainModule } from './main/main.module';
import { LayoutModule } from './layout/layout.module';
import { AuthService } from './common/services/auth.service';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		AuthModule,
		CabinetModule,
		MainModule,
		LayoutModule
	],
	exports: [
		
	],
	providers: [
		AuthService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
