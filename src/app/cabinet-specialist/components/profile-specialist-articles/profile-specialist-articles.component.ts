import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UsersService, ArticlesService } from 'src/app/common/services';
import { UserRole } from 'src/app/common/enums';
import { Article } from 'src/app/common/models';
import { PaginationComponent } from 'src/app/layout/pagination/pagination.component';

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
            .subscribe(res => {
                if (!res.success) {
                    alert(res.message);

                    return;
                }

                this.articles = res.data;
                this.pageNumber = res.currentPage;
				this.pageSize = res.pageSize;
				this.totalPages = res.totalPages;
            });
    }

    setPageSize(value: number) {
        this.loadArticles(value, this.pageNumber);
    }

    setPageNumber(value: number) {
        this.loadArticles(this.pageSize, value);
    }
}