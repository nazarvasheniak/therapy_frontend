import { Component } from '@angular/core';
import { LoaderService } from 'src/app/common/services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

    isShown: boolean;

    constructor(private loaderService: LoaderService, private router: Router) {
        this.loaderService.isLoading
            .subscribe(loading => this.isShown = loading);
    }

    show() {
        this.isShown = true;
    }

    hide() {
        this.isShown = false;
    }
}