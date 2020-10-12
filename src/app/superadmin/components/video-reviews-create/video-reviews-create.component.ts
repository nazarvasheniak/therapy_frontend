import { Location } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { ClientVideoReview } from 'src/app/common/models';
import { AuthService, FilesService } from 'src/app/common/services';
import { PaginationComponent } from 'src/app/layout/pagination/pagination.component';
import { SuperadminService } from '../../services';


@Component({
	selector: 'superadmin-video-reviews-create',
	templateUrl: './video-reviews-create.component.html',
	styleUrls: ['./video-reviews-create.component.scss']
})
export class SuperadminVideoReviewsCreateComponent implements OnInit {

    public createVideoReviewForm: FormGroup;
    public dragAreaClass: string;
    
    public imagePreviewStr: string | ArrayBuffer;
    public imagePreviewFile: globalThis.File;

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

    constructor(
        private superAdminService: SuperadminService,
        private filesService: FilesService,
        private location: Location
    ) {
        
    }

    private initCreateVideoReviewForm(): void {
        this.createVideoReviewForm = new FormGroup({
            fullName: new FormControl(null, [Validators.required]),
            photoID: new FormControl(0, [Validators.required]),
            text: new FormControl(null, [Validators.required, Validators.maxLength(120)]),
            linkVK: new FormControl(null, [Validators.required]),
            linkYouTube: new FormControl(null, [Validators.required])
        });
    }

    ngOnInit(): void {
        this.initCreateVideoReviewForm();
    }

    prevRoute() {
		this.location.back();
    }
    
    editPreviewImage() {
        this.createVideoReviewForm
            .controls['photoID']
            .setValue(null);

        this.imagePreviewFile = null;
        this.imagePreviewStr = null;
    }

    toBase64(file) {
        return from(new Promise<string | ArrayBuffer>((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        }));
    }

    setPreviewImage(files: FileList) {
        this.imagePreviewFile = files[0];

        this.toBase64(files[0])
            .subscribe(encodedImg => {
                this.imagePreviewStr = encodedImg;
            });
    }

    submit(form: FormGroup) {
        if (form.invalid) {
            return;
        }

        if (!this.imagePreviewFile) {
            return;
        }

        this.filesService
            .uploadFileForm({ file: this.imagePreviewFile })
            .subscribe(photoResponse => {
                if (!photoResponse.success) {
                    return;
                }

                this.superAdminService
                    .createVideoReview({
                        fullName: form.value['fullName'],
                        text: form.value['text'],
                        photoID: photoResponse.data.id,
                        linkVK: form.value['linkVK'],
                        linkYouTube: form.value['linkYouTube']
                    })
                    .subscribe(reviewResponse => {
                        this.prevRoute();
                    });
            });
    } 
}