import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { RouterModule } from '@angular/router';
import { SpecialistsComponent } from './components/specialists/specialists.component';
import { SpecialistComponent } from './components/specialist/specialist.component';

@NgModule({
    declarations: [
        SpecialistsComponent,
        SpecialistComponent
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