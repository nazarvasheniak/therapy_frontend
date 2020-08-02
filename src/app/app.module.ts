import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule, LoaderGuard } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CabinetModule } from './cabinet/cabinet.module';
import { MainModule } from './main/main.module';
import { LayoutModule } from './layout/layout.module';
import { AuthService } from './common/services/auth.service';
import { UsersService, PublicService, PatientService, SpecialistsService, ArticlesService, FilesService, UsersWalletsService, PaymentsService, StorageService, SpecialistService, LoaderService } from './common/services';
import { SpecialistsModule } from './specialists/specialists.module';
import { ArticlesModule } from './articles/articles.module';
import { CabinetSpecialistModule } from './cabinet-specialist/cabinet-specialist.module';
import { registerLocaleData, LocationStrategy, HashLocationStrategy } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeRu from '@angular/common/locales/ru';
import { LoaderInterceptor } from './common/interceptors';

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeRu);

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		AuthModule,
		CabinetModule,
		CabinetSpecialistModule,
		MainModule,
		LayoutModule,
		SpecialistsModule,
		ArticlesModule
	],
	exports: [
		
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'ru' },
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
		LoaderService,
		AuthService,
		LoaderGuard,
		UsersService,
		UsersWalletsService,
		PublicService,
		PatientService,
		SpecialistService,
		SpecialistsService,
		ArticlesService,
		FilesService,
		PaymentsService,
		StorageService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
