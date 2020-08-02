import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UsersService, ArticlesService } from 'src/app/common/services';
import { UserRole } from 'src/app/common/enums';
import { Article } from 'src/app/common/models';
import { PaginationComponent } from 'src/app/layout/pagination/pagination.component';
import { ProfileSpecialistDeleteDialog } from '../profile-specialist-delete-dialog/profile-specialist-delete-dialog.component';

@Component({
    selector: 'app-profile-specialist-articles',
    templateUrl: './profile-specialist-articles.component.html',
    styleUrls: ['./profile-specialist-articles.component.scss']
})
export class ProfileSpecialistArticlesComponent implements OnInit {

    public articles: Article[];

    public pageSize = 5;
    public pageNumber = 1;
    public totalPages = 1;

    @ViewChild(PaginationComponent) pagination: PaginationComponent;
    @ViewChild(ProfileSpecialistDeleteDialog) deleteDialog: ProfileSpecialistDeleteDialog;

    constructor(
        private router: Router,
        private authService: AuthService,
        private usersService: UsersService,
        private articlesService: ArticlesService
    ) {

    }

    ngOnInit(): void {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (!logged) {
                    this.router.navigate(['/sign-in']);

                    return;
                }

                this.usersService.getUserInfo()
                    .subscribe(user => {
                        if (user.role == UserRole.Client) {
                            alert('Доступ запрещен');

                            this.router.navigate(['/']);

                            return;
                        }

                        this.loadArticles(5, 1);
                    })
            });
    }

    private loadArticles(pageSize: number, pageNumber: number) {
        this.articlesService.getMyArticles({ pageSize, pageNumber })
            .subscribe(response => {
                this.articles = response.data;
                this.pageNumber = response.currentPage;
                this.pageSize = response.pageSize;
                this.totalPages = response.totalPages;
            });
    }

    showDeleteArticleDialog(articleID: number) {
        const article = this.articles.find(x => x.id == articleID);
        if (!article) {
            return;
        }

        this.deleteDialog.open(article);
    }

    setPageSize(value: number) {
        this.loadArticles(value, this.pageNumber);
    }

    setPageNumber(value: number) {
        this.loadArticles(this.pageSize, value);
    }
}