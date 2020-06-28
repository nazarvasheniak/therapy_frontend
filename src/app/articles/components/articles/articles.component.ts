import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticlesService } from 'src/app/common/services';
import { Article } from 'src/app/common/models';
import { PaginationComponent } from 'src/app/layout/pagination/pagination.component';
import { ArticlesSorter } from './articles-sorter.enum';
import { SortBy } from 'src/app/common/enums';

@Component({
	selector: 'app-articles',
	templateUrl: './articles.component.html',
	styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

	public articles: Article[];
	
	public pageSize = 5;
	public pageNumber = 1;
	public totalPages = 1;

	public sorter: ArticlesSorter;
	public sortBy: SortBy;

	@ViewChild(PaginationComponent) pagination: PaginationComponent;

	constructor(
		private articlesService: ArticlesService
	) {

	}

	ngOnInit() {
		this.loadArticles(1, 5);
	}

	private loadArticles(pageNumber: number, pageSize: number) {
		this.articlesService.getArticles({ pageNumber, pageSize })
			.subscribe(res => {
				if (!res.success) {
					alert(res.message);

					return;
				}

				this.pageNumber = res.currentPage;
				this.pageSize = res.pageSize;
				this.totalPages = res.totalPages;

				if (!this.sorter) {
					this.sorter = ArticlesSorter.Date;
					this.sortBy = SortBy.ASC;

					this.articles = res.data.sort((a, b) => {
						return new Date(a.date).getTime() - new Date(b.date).getTime();
					});

					window.scroll(0,0);

					return;
				}

				this.sortArticles(res.data);
			});
	}

	private sortByLikes(articles: Article[], sortBy: SortBy) {
		if (sortBy == SortBy.ASC) {
			return articles.sort((a, b) => {
				return a.likes.length - b.likes.length
			});
		}

		if (sortBy == SortBy.DESC) {
			return articles.sort((a, b) => {
				return b.likes.length - a.likes.length
			});
		}

		return articles;
	}

	private sortByComments(articles: Article[], sortBy: SortBy) {
		if (sortBy == SortBy.ASC) {
			return articles.sort((a, b) => {
				return a.comments.length - b.comments.length
			});
		}

		if (sortBy == SortBy.DESC) {
			return articles.sort((a, b) => {
				return b.comments.length - a.comments.length
			});
		}

		return articles;
	}

	private sortArticles(articles: Article[]) {
		if (this.sorter == ArticlesSorter.Date) {
			if (this.sortBy == SortBy.ASC) {
				this.articles = articles.sort((a, b) => {
					return new Date(a.date).getTime() - new Date(b.date).getTime();
				});

				window.scroll(0,0);

				return;
			}
			
			if (this.sortBy == SortBy.DESC) {
				this.articles = articles.sort((a, b) => {
					return new Date(b.date).getTime() - new Date(a.date).getTime();
				});

				window.scroll(0,0);

				return;
			}

			return;
		}

		if (this.sorter == ArticlesSorter.Likes) {
			this.articles = this.sortByLikes(articles, this.sortBy);

			window.scroll(0,0);

			return;
		}

		if (this.sorter == ArticlesSorter.Comments) {
			this.articles = this.sortByComments(articles, this.sortBy);

			window.scroll(0,0);

			return;
		}

		return;
	}

	likeArticle(id: number) {
		this.articlesService
			.likeArticle(id)
			.subscribe(res => {
				if (!res.success) {
					alert(res.message);

					return;
				}

				
				this.loadArticles(this.pageNumber, this.pageSize);
			});
	}

	setPageSize(value: number) {
		this.loadArticles(1, Number(value));
	}

	setPageNumber(value: number) {
		this.loadArticles(value, this.pageSize);
	}

	setSorter(sorter: ArticlesSorter) {
		if (sorter == this.sorter) {
			this.toggleSortDirection();

			return;
		}

		this.sorter = sorter;
		this.sortBy = SortBy.ASC;

		this.sortArticles(this.articles);
	}

	toggleSortDirection() {
		if (this.sortBy == SortBy.ASC) {
			this.sortBy = SortBy.DESC;

			this.sortArticles(this.articles);

			return;
		}

		if (this.sortBy == SortBy.DESC) {
			this.sortBy = SortBy.ASC;

			this.sortArticles(this.articles);

			return;
		}

		return;
	}
}