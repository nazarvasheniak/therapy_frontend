import { Component, OnInit, Input, ViewChild, AfterViewChecked } from '@angular/core';
import { Article } from 'src/app/common/models';
import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { LoaderService } from 'src/app/common/services';

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

    constructor(private loaderService: LoaderService) {
        
    }

    showLoader() {
        this.loaderService.next(true);

        setTimeout(() => {
            this.loaderService.next(false);
        }, 100);
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

        this.showLoader();

        let timeout = setTimeout(() => {
            this.setActiveArticle(this.articles[activeIndex + 1]);
        }, 100);
    }

    public togglePrevArticle() {
        let activeIndex = this.articles.indexOf(this.activeArticle);

        if (activeIndex == 0) {
            return;
        }

        this.showLoader();

        let timeout = setTimeout(() => {
            this.setActiveArticle(this.articles[activeIndex - 1]);
        }, 100);
    }

    ngOnInit() {
        this.setActiveArticle(this.articles[0]);
    }

    ngAfterViewChecked() {
        this.articlesSwitcherMobile.indexChange
            .subscribe(slide => {
                this.showLoader();

                let timeout = setTimeout(() => {
                    this.setActiveArticle(this.articles[slide]);
                }, 100);
            });
    }
}