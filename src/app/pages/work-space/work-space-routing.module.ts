import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WorkSpaceComponent } from './work-space.component';

const routes: Routes = [
    {
        path: 'work-space',
        component: WorkSpaceComponent
    }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkSpaceRoutingModule { }
