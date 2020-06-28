import { Component, AfterViewInit, HostListener, OnInit, Input, ViewChild, AfterViewChecked } from '@angular/core';
import { Article, User } from 'src/app/common/models';
import { UserRole } from 'src/app/common/enums';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';

declare var $: any;

@Component({
    selector: 'articles-carousel',
    templateUrl: './articles-carousel.component.html',
    styleUrls: ['./articles-carousel.component.scss']
})
export class ArticlesCarouselComponent implements OnInit, AfterViewChecked {

    @Input('articles') articles: Article[];
    @ViewChild('articlesSwitcherMobile') articlesSwitcherMobile: SwiperComponent;

    public activeArticle: Article;
    public prevArticle: Article;

    public isLoading = false;

    articlesSwitcherConfig: SwiperConfigInterface = {
        centeredSlides: true
    }

    articlesSwitcherCurrentSlide = 0;

    constructor() {
        
    }

    public setActiveArticle(article: Article) {
        this.activeArticle = article;

        let activeIndex = this.articles.indexOf(this.activeArticle);

        if (activeIndex != 0) {
            this.prevArticle = this.articles[activeIndex - 1];
        } else {
            this.prevArticle = null;
        }

        this.articlesSwitcherCurrentSlide = activeIndex;
    }

    public toggleNextArticle() {
        let activeIndex = this.articles.indexOf(this.activeArticle);

        if (activeIndex == (this.articles.length - 1)) {
            return;
        }

        this.setActiveArticle(this.articles[activeIndex + 1]);
    }

    public togglePrevArticle() {
        let activeIndex = this.articles.indexOf(this.activeArticle);

        if (activeIndex == 0) {
            return;
        }

        this.setActiveArticle(this.articles[activeIndex - 1]);
    }

    /* @HostListener('window:resize', ['$event'])
    onResize(event) {
        
    } */

    ngOnInit() {
        this.setActiveArticle(this.articles[0]);
    }

    ngAfterViewChecked() {
        this.articlesSwitcherMobile.indexChange
            .subscribe(slide => {
                this.setActiveArticle(this.articles[slide]);
            });
    }
}