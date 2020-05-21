import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

declare var $: any;

@Component({
    selector: 'webinar-modal',
    templateUrl: './webinar-modal.component.html',
    styleUrls: ['./webinar-modal.component.scss']
})
export class WebinarModalComponent implements OnInit {

    @ViewChild("name") name: ElementRef;
    @ViewChild("email") email: ElementRef;
    @ViewChild("phone") phone: ElementRef;

    constructor() { }

    ngOnInit(): void {
        $("#phone").mask("+7 (999) 999-99-99", {autoclear: false});
    }

    close() {
        let webinarModal = document.getElementById('webinar-modal')
        webinarModal.classList.remove('show')
        webinarModal.classList.add('hidden');
    }
    
    labelClick(inputName: string) {
        this[inputName].nativeElement.focus();
    }
}