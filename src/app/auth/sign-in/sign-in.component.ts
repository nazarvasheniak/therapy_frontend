import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
	selector: 'app-signin',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    constructor() {

    }

    ngOnInit(): void {
        $("#phone").mask("+7 (999) 999-99-99");
    }
}
