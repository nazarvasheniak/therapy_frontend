import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { ProfileSpecialistComponent } from './components/profile-specialist/profile-specialist.component';

@NgModule({
    declarations: [
        ProfileSpecialistComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        LayoutModule
    ],
    providers: [
        
    ]
})
export class CabinetSpecialistModule { }