import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { LayoutModule } from '../layout/layout.module';
import { ProfileSidebarComponent } from './components/profile-sidebar/profile-sidebar.component';

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileSidebarComponent
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
export class CabinetModule { }