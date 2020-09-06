import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UsersService, FilesService, ArticlesService, RouterExtService } from 'src/app/common/services';
import { UserRole } from 'src/app/common/enums';

import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/languages/ru.js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { FroalaEditorDirective } from 'angular-froala-wysiwyg';

import * as $ from 'jquery';

@Component({
    selector: 'app-profile-specialist-create-article',
    templateUrl: './profile-specialist-create-article.component.html',
    styleUrls: ['./profile-specialist-create-article.component.scss']
})
export class ProfileSpecialistCreateArticleComponent implements OnInit, AfterViewInit {

    public articleForm: FormGroup;
    dragAreaClass: string;

    public editor;

    public editorOptions = {
        toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'fontSize', 'insertImage'],
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
        private authService: AuthService,
        private usersService: UsersService,
        private filesService: FilesService,
        private articlesService: ArticlesService,
        private routerService: RouterExtService
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

                        this.initArticleForm();
                    });
            });
    }

    @HostListener("dragover", ["$event"]) onDragOver(event: any) {
        this.dragAreaClass = "";
        event.preventDefault();
    }
    @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
        this.dragAreaClass = "";
        event.preventDefault();
    }
    @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
    }
    @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
    }
    @HostListener("drop", ["$event"]) onDrop(event: any) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files) {
            this.setPreviewImage(event.dataTransfer.files);
        }
    }

    ngAfterViewInit() {
        /* const previewImageContainer = $('.article-preview-image');

        $('.article-preview-image').on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
            console.log(e)
            e.preventDefault();
            e.stopPropagation();
        }).on('drop', function (e) {
            console.log(e.originalEvent.dataTransfer.files);
        }); */
    }

    prevRoute() {
        this.router.navigate([this.routerService.getPreviousUrl()]);
    }

    private initArticleForm() {
        this.articleForm = new FormGroup({
            title: new FormControl(null, [Validators.required]),
            previewImage: new FormControl(null, [Validators.required]),
            shortText: new FormControl(null, [Validators.required]),
            text: new FormControl(null, [Validators.required])
        });
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

    setPreviewImage(files: FileList) {
        this.toBase64(files[0])
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

    submitArticle() {
        this.articleForm
            .controls['text']
            .setValue(this.editorContent);

        console.log(this.articleForm.value);

        if (this.articleForm.invalid) {
            alert('Заполните все поля');

            return;
        }

        this.uploadPreviewImage()
            .subscribe(uploadRes => {
                if (!uploadRes.success) {
                    alert(uploadRes.message);

                    return;
                }

                this.articlesService
                    .createArticle({
                        title: this.articleForm.value['title'],
                        shortText: this.articleForm.value['shortText'],
                        text: this.articleForm.value['text'],
                        previewImageID: uploadRes.data.id
                    })
                    .subscribe(res => {
                        if (!res.success) {
                            alert(res.message);

                            return;
                        }

                        this.router.navigate(['/profile-specialist/articles']);
                    });
            });
    }
}