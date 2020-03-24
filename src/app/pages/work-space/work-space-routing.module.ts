import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WorkSpaceComponent } from './work-space.component';

import { UnauthenticatedGuard } from '../../core/guards/unauthenticated.guard';

const routes: Routes = [
    {
        path: '',
        component: WorkSpaceComponent,
        canActivate: [UnauthenticatedGuard]
    }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkSpaceRoutingModule { }
