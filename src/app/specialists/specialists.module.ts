import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { RouterModule } from '@angular/router';
import { SpecialistsComponent } from './components/specialists/specialists.component';

@NgModule({
    declarations: [
        SpecialistsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        LayoutModule
    ],
    providers: [
        
    ]
})
export class SpecialistsModule { }