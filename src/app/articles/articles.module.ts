import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { RouterModule } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleComponent } from './components/article/article.component';

@NgModule({
    declarations: [
        ArticlesComponent,
        ArticleComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        LayoutModule
    ],
    providers: [
        
    ]
})
export class ArticlesModule { }