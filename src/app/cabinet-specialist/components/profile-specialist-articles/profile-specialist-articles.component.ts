import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UsersService, ArticlesService } from 'src/app/common/services';
import { UserRole } from 'src/app/common/enums';
import { Article } from 'src/app/common/models';

@Component({
	selector: 'app-profile-specialist-articles',
	templateUrl: './profile-specialist-articles.component.html',
	styleUrls: ['./profile-specialist-articles.component.scss']
})
export class ProfileSpecialistArticlesComponent implements OnInit {
    
    public articles: Article[];

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

                        this.loadArticles();
                    })
            });
    }

    private loadArticles() {
        this.articlesService.getMyArticles()
            .subscribe(res => {
                if (!res.success) {
                    alert(res.message);

                    return;
                }

                this.articles = res.data;
            });
    }
}