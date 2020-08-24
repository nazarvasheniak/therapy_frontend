import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService, RouterExtService } from 'src/app/common/services';
import { Article, User, ArticleComment } from 'src/app/common/models';
import { StringHelper } from 'src/app/common/helpers';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
	selector: 'app-article',
	animations: [
		trigger(
			'replyAnimation', [
			transition(':enter', [
				style({ opacity: 0 }),
				animate('300ms', style({ opacity: 1 }))
			]),
			transition(':leave', [
				style({ opacity: 1 }),
				animate('300ms', style({ opacity: 0 }))
			])
		]
		)
	],
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

	public commentForm: FormGroup;

	public article: Article;
	public replyID: number;
	public commentText: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private routerService: RouterExtService,
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

	private initCommentForm() {
		this.commentForm = new FormGroup({
			isReply: new FormControl(false, [Validators.required]),
			parentCommentID: new FormControl(0),
			text: new FormControl(null, [Validators.required])
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
				this.initCommentForm();
			});
	}

	likeArticle() {
		this.articlesService
			.likeArticle(this.article.id)
			.subscribe(res => {
				if (!res.success) {
					alert(res.message);

					return;
				}

				this.loadArticle(this.article.id);
			});
	}

	get comments() {
		return this.article.comments.filter(x => !x.isReply);
	}

	getReplies(commentID: number) {
		let result: ArticleComment[] = [];

		result.push(...this.getCommentReplies(commentID));

		result.forEach(replie => {
			result.push(...this.getCommentReplies(replie.id));
		});

		return result;
	}

	private getCommentReplies(commentID: number) {
		return this.article.comments.filter(x => x.parentComment.id == commentID);
	}

	getAvatar(user: User) {
		return StringHelper.getFirstLetter(user.firstName);
	}

	showReply(id: number) {
		this.replyID = id;

		setTimeout(() => {
			this.replyID = null;
		}, 800);
	}

	setReply(parentCommentID: number) {
		this.replyID = parentCommentID;
		this.commentForm.controls['isReply'].setValue(true);
		this.commentForm.controls['parentCommentID'].setValue(parentCommentID);
	}

	cancelReply() {
		this.replyID = null;
		this.commentForm.controls['isReply'].setValue(false);
		this.commentForm.controls['parentCommentID'].setValue(0);
	}

	getParentComment(parentCommentID: number) {
		return this.article.comments.find(x => x.id == parentCommentID);
	}

	submitComment() {
		this.commentForm.controls['text'].setValue(this.commentText);

		if (this.commentForm.invalid) {
			alert('form invalid');

			return;
		}

		this.articlesService
			.commentArticle(this.commentForm.value, this.article.id)
			.subscribe(res => {
				if (!res.success) {
					alert(res.message);

					return;
				}

				this.commentText = null;
				this.loadArticle(this.article.id);
			});
	}

	prevRoute() {
		this.router.navigate([this.routerService.getPreviousUrl()]);
	}
}