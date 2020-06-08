import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/common/services';
import { Article } from 'src/app/common/models';

@Component({
	selector: 'app-articles',
	templateUrl: './articles.component.html',
	styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

	public articles: Article[];

	constructor(
		private articlesService: ArticlesService
	) {

	}

	ngOnInit() {
		this.loadArticles();
	}

	private loadArticles() {
		this.articlesService.getArticles()
			.subscribe(res => {
				if (!res.success) {
					alert(res.message);

					return;
				}

				this.articles = res.data;
			});
	}
}