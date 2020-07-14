import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { LayoutModule } from '../layout/layout.module';
import { ProfileSidebarComponent } from './components/profile-sidebar/profile-sidebar.component';
import { ProblemComponent } from './components/problem/problem.component';
import { ChooseSpecialistComponent } from './components/choose-specialist/choose-specialist.component';
import { SpecialistsModule } from '../specialists/specialists.module';
import { CreateProblemComponent } from './components/create-problem/create-problem.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileSidebarComponent,
        ProblemComponent,
        ChooseSpecialistComponent,
        CreateProblemComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        LayoutModule,
        SpecialistsModule,
        NgxSpinnerModule
    ],
    providers: [
        
    ]
})
export class CabinetModule { }