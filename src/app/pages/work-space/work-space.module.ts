import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkSpaceRoutingModule } from './work-space-routing.module';

import { WorkSpaceComponent } from './work-space.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [WorkSpaceComponent],
    imports: [
        CommonModule,
        SharedModule,
        WorkSpaceRoutingModule
    ]
})
export class WorkSpaceModule { }
