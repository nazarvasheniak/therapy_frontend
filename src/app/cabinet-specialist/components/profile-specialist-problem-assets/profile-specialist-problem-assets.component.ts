import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpecialistService, AuthService } from 'src/app/common/services';
import { ClientCard, ProblemAssets, ProblemImage } from 'src/app/common/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateUpdateProblemImageRequest } from 'src/app/common/models/request';

@Component({
	selector: 'app-profile-specialist-problem-assets',
	templateUrl: './profile-specialist-problem-assets.component.html',
	styleUrls: ['./profile-specialist-problem-assets.component.scss']
})
export class ProfileSpecialistProblemAssetsComponent implements OnInit {

    public activeTab = 1;

    public client: ClientCard;
    public assets: ProblemAssets;

    public createImageForm: FormGroup;
    public editImageForm: FormGroup;

    constructor(
        private authService: AuthService,
        private specialistService: SpecialistService,
        private router: Router,
        private route: ActivatedRoute
    ) {

    }

    private initCreateImageForm() {
        this.createImageForm = new FormGroup({
            title: new FormControl(null, [Validators.required]),
            emotion: new FormControl(null, [Validators.required]),
            location: new FormControl(null, [Validators.required]),
            characteristic: new FormControl(null, [Validators.required]),
            isMine: new FormControl(false),
            isIDo: new FormControl(false),
            isForever: new FormControl(false),
            likeScore: new FormControl(0),
            parentImageID: new FormControl(0)
        });
    }

    private initEditImageForm() {
        this.editImageForm = new FormGroup({
            id: new FormControl(null),
            title: new FormControl(null, [Validators.required]),
            emotion: new FormControl(null, [Validators.required]),
            location: new FormControl(null, [Validators.required]),
            characteristic: new FormControl(null, [Validators.required]),
            isMine: new FormControl(false),
            isIDo: new FormControl(false),
            isForever: new FormControl(false),
            likeScore: new FormControl(0),
            parentImageID: new FormControl(0)
        });
    }

    private fillEditImageForm(image: ProblemImage) {
        this.editImageForm = new FormGroup({
            id: new FormControl(image.id),
            title: new FormControl(image.title, [Validators.required]),
            emotion: new FormControl(image.emotion, [Validators.required]),
            location: new FormControl(image.location, [Validators.required]),
            characteristic: new FormControl(image.characteristic, [Validators.required]),
            isMine: new FormControl(image.isMine),
            isIDo: new FormControl(image.isIDo),
            isForever: new FormControl(image.isForever),
            likeScore: new FormControl(image.likeScore),
            parentImageID: new FormControl(image.parentImage ? image.parentImage.id : 0)
        });
    }

    private loadClient(clientID: number) {
        this.specialistService.getClient(clientID)
            .subscribe(client => this.client = client);
    }

    private loadAssets(clientID: number, problemID: number) {
        this.specialistService.getClientAssets(clientID, problemID)
            .subscribe(assets => this.assets = assets);
    }

    createProblemImage() {
        this.initCreateImageForm();
    }

    editProblemImage(image: ProblemImage) {
        this.createImageForm = null;
        this.fillEditImageForm(image);
    }

    hideProblemImage(image: ProblemImage) {
        this.specialistService
            .hideClientProblemImage(this.client.user.id, this.assets.problem.id, image.id)
            .subscribe(images => this.assets.images = images);
    }

    reloadProblemImage(image: ProblemImage) {
        this.specialistService
            .reloadClientProblemImage(this.client.user.id, this.assets.problem.id, image.id)
            .subscribe(images => this.assets.images = images);
    }

    submitCreateProblemImage(form: FormGroup) {
        if (form.invalid) {
            alert('form invalid');
            
            return;
        }

        const request: CreateUpdateProblemImageRequest = {...form.value};
        request.parentImageID = Number(request.parentImageID);

        this.specialistService
            .createClientProblemImage(request, this.client.user.id, this.assets.problem.id)
            .subscribe(images => {
                this.assets.images = images;
                this.createImageForm = null;
            });
    }

    submitEditProblemImage(form: FormGroup) {
        if (form.invalid) {
            alert('form invalid');
            
            return;
        }

        const request: CreateUpdateProblemImageRequest = {...form.value};
        request.parentImageID = Number(request.parentImageID);

        this.specialistService
            .updateClientProblemImage(request, this.client.user.id, this.assets.problem.id, form.value['id'])
            .subscribe(images => {
                this.assets.images = images;
                this.editImageForm.reset();
            });
    }

    ngOnInit(): void {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (!logged) {
                    this.router.navigate(['/']);

                    return;
                }

                this.route.params
                    .subscribe(params => {
                        this.loadClient(params['clientID']);
                        this.loadAssets(params['clientID'], params['problemID']);
                    });

                this.route.queryParams
                    .subscribe(params => {
                        const tab = params['tab'];

                        if (!tab) {
                            return;
                        }

                        this.setActiveTab(tab);
                    });

                this.initEditImageForm();
            });
    }

    setActiveTab(tab: number) {
        this.activeTab = tab;
    }

    labelClick(input) {
        input.focus();
    }

    normalizeMonth(monthStr: string) {
        return monthStr.replace(".", "");
    }

    getImage(imageID: number) {
        return this.assets.images.find(x => x.id == imageID);
    }

    getImageID(image: ProblemImage) {
        return image.id;
    }
}