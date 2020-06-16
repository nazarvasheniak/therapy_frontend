import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { ProfileSpecialistComponent } from './components/profile-specialist/profile-specialist.component';
import { ProfileSpecialistSidebarComponent } from './components/profile-specialist-sidebar/profile-specialist-sidebar.component';
import { ProfileSpecialistArticlesComponent } from './components/profile-specialist-articles/profile-specialist-articles.component';
import { ProfileSpecialistCreateArticleComponent } from './components/profile-specialist-create-article/profile-specialist-create-article.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ProfileSpecialistEditArticleComponent } from './components/profile-specialist-edit-article/profile-specialist-edit-article.component';

@NgModule({
    declarations: [
        ProfileSpecialistComponent,
        ProfileSpecialistArticlesComponent,
        ProfileSpecialistCreateArticleComponent,
        ProfileSpecialistEditArticleComponent,
        ProfileSpecialistSidebarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        LayoutModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot()
    ],
    providers: [
        
    ]
})
export class CabinetSpecialistModule { }