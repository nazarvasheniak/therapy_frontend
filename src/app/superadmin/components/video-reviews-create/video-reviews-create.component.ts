import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ClientVideoReview } from 'src/app/common/models';
import { SuperadminService } from '../../services';


@Component({
    selector: 'superadmin-video-reviews-create',
    templateUrl: './video-reviews-create.component.html',
    styleUrls: ['./video-reviews-create.component.scss']
})
export class SuperadminVideoReviewsCreateComponent implements OnInit {

    public review: ClientVideoReview;
    public createVideoReviewForm: FormGroup;

    constructor(
        private superAdminService: SuperadminService,
        private route: ActivatedRoute,
        private location: Location
    ) {

    }

    private initCreateVideoReviewForm(): void {
        this.createVideoReviewForm = new FormGroup({
            fullName: new FormControl(null, [Validators.required]),
            text: new FormControl(null, [Validators.required, Validators.maxLength(150)]),
            linkYouTube: new FormControl(null, [Validators.required])
        });

        const editingReviewID = this.route.snapshot.params['id'];

        if (editingReviewID) {
            this.review = window.history.state;
            this.fillCreateVideoReviewForm();
        }
    }

    private fillCreateVideoReviewForm() {
        this.createVideoReviewForm
            .controls['fullName']
            .setValue(this.review.fullName);

        this.createVideoReviewForm
            .controls['text']
            .setValue(this.review.text);

        this.createVideoReviewForm
            .controls['linkYouTube']
            .setValue(this.review.linkYouTube);
    }

    ngOnInit(): void {
        this.initCreateVideoReviewForm();
    }

    prevRoute() {
        this.location.back();
    }

    submit(form: FormGroup) {
        if (form.controls['fullName'].invalid) {
            alert('Заполните имя!')

            return;
        }

        if (form.controls['text'].hasError('required')) {
            alert('Заполните текст отзыва!');

            return;
        }

        if (form.controls['text'].hasError('maxlength')) {
            alert('Максимальная длина текста отзыва - 150 символов!');

            return;
        }

        if (!this.review) {
            this.superAdminService
                .createVideoReview({
                    fullName: form.value['fullName'],
                    text: form.value['text'],
                    linkYouTube: form.value['linkYouTube']
                })
                .subscribe(reviewResponse => {
                    this.prevRoute();
                });

            return;
        }

        this.superAdminService
            .editVideoReview({
                fullName: form.value['fullName'],
                text: form.value['text'],
                linkYouTube: form.value['linkYouTube']
            }, this.review.id)
            .subscribe(reviewResponse => {
                this.prevRoute();
            });
    }
}