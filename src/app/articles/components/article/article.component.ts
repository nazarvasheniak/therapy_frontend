import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from 'src/app/common/services';
import { Article } from 'src/app/common/models';

@Component({
	selector: 'app-article',
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

	public article: Article;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private articlesService: ArticlesService
	) {

	}

	ngOnInit() {
		this.route.params
			.subscribe(params => {
				const id = params['id'];

				if (!id) {
					this.router.navigate(['/articles']);

					return;
				}

				this.loadArticle(id);
			});
	}

	private loadArticle(id: number) {
		this.articlesService.getArticle(id)
			.subscribe(res => {
				if (!res.success) {
					alert(res.message);

					return;
				}

				this.article = res.data;
			});
	}
}