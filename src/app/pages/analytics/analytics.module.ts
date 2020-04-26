import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';

import { AnalyticsComponent } from './analytics.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        AnalyticsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AnalyticsRoutingModule
    ]
})
export class AnalyticsModule { }
