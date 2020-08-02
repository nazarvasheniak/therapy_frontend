import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpecialistService, AuthService, RouterExtService } from 'src/app/common/services';
import { ClientCard, ProblemAssets, ProblemImage, ProblemResource, ProblemResourceTask } from 'src/app/common/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateUpdateProblemImageRequest, CreateUpdateProblemResourceTask, CreateUpdateProblemResourceRequest } from 'src/app/common/models/request';
import { ViewHelper } from 'src/app/common/helpers';
import { DomSanitizer } from '@angular/platform-browser';

type AssetTab = "images" | "resources" | "sessions";

@Component({
	selector: 'app-profile-specialist-problem-assets',
	templateUrl: './profile-specialist-problem-assets.component.html',
	styleUrls: ['./profile-specialist-problem-assets.component.scss']
})
export class ProfileSpecialistProblemAssetsComponent implements OnInit {

    public activeTab: AssetTab = "images";

    public client: ClientCard;
    public assets: ProblemAssets;

    public createImageForm: FormGroup;
    public editImageForm: FormGroup;

    public createResourceForm: FormGroup;
    public editResourceForm: FormGroup;

    public createTaskInput: string;

    @ViewChild('assetsTabs') private assetsTabs: ElementRef<HTMLUListElement>;

    constructor(
        private authService: AuthService,
        private specialistService: SpecialistService,
        private router: Router,
        private route: ActivatedRoute,
        private routerService: RouterExtService
    ) {

    }

    prevRoute() {
		this.router.navigate([this.routerService.getPreviousUrl()]);
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

    private initCreateResourceForm() {
        this.createResourceForm = new FormGroup({
            title: new FormControl(null, [Validators.required]),
            emotion: new FormControl(null, [Validators.required]),
            location: new FormControl(null, [Validators.required]),
            characteristic: new FormControl(null, [Validators.required]),
            influence: new FormControl(null, [Validators.required]),
            likeScore: new FormControl(0),
            tasks: new FormControl([])
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

    private initEditResourceForm() {
        this.editResourceForm = new FormGroup({
            id: new FormControl(null),
            title: new FormControl(null, [Validators.required]),
            emotion: new FormControl(null, [Validators.required]),
            location: new FormControl(null, [Validators.required]),
            characteristic: new FormControl(null, [Validators.required]),
            influence: new FormControl(null, [Validators.required]),
            likeScore: new FormControl(0),
            tasks: new FormControl([])
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

    private fillEditResourceForm(resource: ProblemResource) {
        this.editResourceForm.setValue({
            id: resource.id,
            title: resource.title,
            emotion: resource.emotion,
            location: resource.location,
            characteristic: resource.characteristic,
            influence: resource.influence,
            likeScore: resource.likeScore,
            tasks: resource.tasks
        });
    }

    private loadClient(clientID: number) {
        this.specialistService.getClient(clientID)
            .subscribe(client => this.client = client);
    }

    private loadAssets(clientID: number, problemID: number) {
        this.specialistService.getClientAssets(clientID, problemID)
            .subscribe(assets => {
                this.assets = assets;
                
                this.route.queryParams
                    .subscribe(params => {
                        const tab = params['tab'];

                        if (!tab) {
                            return;
                        }

                        this.setActiveTab(tab);
                    });
            });
    }

    createProblemImage() {
        this.initCreateImageForm();
    }

    createProblemResource() {
        this.initCreateResourceForm();
    }

    editProblemResource(resource: ProblemResource) {
        this.createResourceForm = null;
        this.fillEditResourceForm(resource);
    }

    createResourceTask(isEdit = false) {
        if (!this.createTaskInput) {
            return;
        }

        if (isEdit) {
            const tasksArr: CreateUpdateProblemResourceTask[] = this.editResourceForm.value['tasks'];

            if (tasksArr.find(x => x.title == this.createTaskInput)) {
                alert('Задание уже существует');

                return;
            }

            tasksArr.push({
                title: this.createTaskInput,
                isDone: false
            });

            this.editResourceForm.controls['tasks'].setValue(tasksArr);
        } else {
            const tasksArr: CreateUpdateProblemResourceTask[] = this.createResourceForm.value['tasks'];

            if (tasksArr.find(x => x.title == this.createTaskInput)) {
                alert('Задание уже существует');

                return;
            }
    
            tasksArr.push({
                title: this.createTaskInput,
                isDone: false
            });
    
            this.createResourceForm.controls['tasks'].setValue(tasksArr);
        }

        this.createTaskInput = null;
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

    submitCreateResourceForm(form: FormGroup) {
        if (form.invalid) {
            alert('form invalid');
            
            return;
        }

        this.specialistService
            .createClientProblemResource(form.value, this.client.user.id, this.assets.problem.id)
            .subscribe(resources => {
                this.assets.resources = resources;
                this.createResourceForm = null;
            });
    }

    submitEditResourceForm(form: FormGroup) {
        if (form.invalid) {
            alert('form invalid');
            
            return;
        };

        this.specialistService
            .editClientProblemResource(form.value, this.client.user.id, this.assets.problem.id, Number(form.value['id']))
            .subscribe(resources => {
                this.assets.resources = resources;
                this.editResourceForm.reset();
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

                this.initEditImageForm();
                this.initEditResourceForm();
            });
    }

    toggleTaskDone(task: CreateUpdateProblemResourceTask, isEdit = false) {
        const tasks = {
            create: this.createResourceForm ? this.createResourceForm.value['tasks'] as CreateUpdateProblemResourceTask[] : [],
            edit: this.editResourceForm ? this.editResourceForm.value['tasks'] as CreateUpdateProblemResourceTask[] : []
        }

        if (isEdit) {
            tasks.edit.map(x => {
                if (x.id == task.id) {
                    x.isDone = !x.isDone;

                    return x;
                }
            });

            this.editResourceForm.controls['tasks'].setValue(tasks.edit);

            return;
        }

        tasks.create.map(x => {
            if (x.title == task.title) {
                x.isDone = !x.isDone;

                return x;
            }
        });

        this.createResourceForm.controls['tasks'].setValue(tasks.create);

        return;
    }

    setActiveTab(tab: AssetTab) {
        this.activeTab = tab;

        if (!this.assetsTabs) {
            return;
        }

        const item = this.assetsTabs.nativeElement.getElementsByTagName('li').namedItem(tab);
        const margin = parseInt(window.getComputedStyle(item).marginLeft);
        
        const scrollTo = (margin / 2) + (item.offsetLeft - item.offsetWidth);

        this.assetsTabs.nativeElement.scrollTo({
            left: scrollTo,
            behavior: 'smooth'
        });
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

    getResource(resourceID: number) {
        return this.assets.resources.find(x => x.id == resourceID);
    }
}