import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, UsersService, FilesService, ArticlesService } from 'src/app/common/services';
import { UserRole } from 'src/app/common/enums';

import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/languages/ru.js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { Article } from 'src/app/common/models';
import { CreateUpdateArticleRequest } from 'src/app/common/models/request';

@Component({
    selector: 'app-profile-specialist-edit-article',
    templateUrl: './profile-specialist-edit-article.component.html',
    styleUrls: ['./profile-specialist-edit-article.component.scss']
})
export class ProfileSpecialistEditArticleComponent implements OnInit {

    public article: Article;
    public articleForm: FormGroup;

    public editor;

    public editorOptions = {
        toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'fontSize', 'insertImage'],
        attribution: false,
        language: 'ru',
        placeholderText: 'Текст статьи',
        events: {
            'initialized': (e) => {
                this.editor = e._editor;
            },

            'image.beforeUpload': (files) => {
                if (files.length) {
                    const reader = new FileReader();

                    reader.readAsDataURL(files[0]);

                    reader.onload = () => {
                        this.editor.image.insert(reader.result, null, null, this.editor.image.get());
                    };

                    this.editor.popups.hideAll();
                    // Stop default upload chain.
                    return false;
                }
            }
        }
    }

    public editorContent: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private usersService: UsersService,
        private filesService: FilesService,
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

                        this.loadArticle();
                    });
            });
    }

    private loadArticle() {
        this.route.params
            .subscribe(params => {
                if (!params['id']) {
                    alert('ID error');

                    return;
                }

                this.articlesService
                    .getArticle(Number(params['id']))
                    .subscribe(res => {
                        if (!res.success) {
                            alert(res.message);

                            return;
                        }

                        this.article = res.data;
                        this.initArticleForm();
                    });
            });
    }

    private initArticleForm() {
        this.articleForm = new FormGroup({
            title: new FormControl(this.article.title, [Validators.required]),
            previewImage: new FormControl(this.article.image.url, [Validators.required]),
            shortText: new FormControl(this.article.shortText, [Validators.required]),
            text: new FormControl(this.article.text, [Validators.required])
        });

        this.editorContent = this.article.text;
    }

    isBase64(value: string) {
        if (value.includes('data:image/jpeg;base64') || value.includes('data:image/png;base64')) {
            return true;
        }

        return false;
    }

    toBase64(file) {
        return from(new Promise<string | ArrayBuffer>((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        }));
    }

    onChange(key, value) {
        this.articleForm
            .controls[key]
            .setValue(value);
    }

    setPreviewImage(event) {
        this.toBase64(event.target.files[0])
            .subscribe(encodedImg => {
                this.articleForm
                    .controls['previewImage']
                    .setValue(encodedImg);
            });
    }

    uploadPreviewImage() {
        if (!this.articleForm.value['previewImage']) {
            alert('No preview image');

            return;
        }

        return this.filesService
            .uploadFile({
                base64string: this.articleForm.value['previewImage']
            });
    }

    async submitArticle() {
        this.articleForm
            .controls['text']
            .setValue(this.editorContent);

        console.log(this.articleForm.value);

        if (this.articleForm.invalid) {
            alert('Заполните все поля');

            return;
        }

        if (this.isBase64(this.articleForm.value['previewImage'])) {
            const uploadReq = await this.uploadPreviewImage().toPromise();
            const uploadRes = uploadReq.data;

            this.sendUpdateRequest({
                title: this.articleForm.value['title'],
                shortText: this.articleForm.value['shortText'],
                text: this.articleForm.value['text'],
                previewImageID: uploadRes.id
            });

            return;
        }

        this.sendUpdateRequest({
            title: this.articleForm.value['title'],
            shortText: this.articleForm.value['shortText'],
            text: this.articleForm.value['text'],
            previewImageID: this.article.image.id
        });
    }

    sendUpdateRequest(request: CreateUpdateArticleRequest) {
        this.articlesService
            .updateArticle(request, this.article.id)
            .subscribe(res => {
                if (!res.success) {
                    alert(res.message);

                    return;
                }

                this.router.navigate(['/profile-specialist/articles']);
            });
    }
}