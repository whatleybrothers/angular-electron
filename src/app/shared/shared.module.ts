import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import { MatDialogModule } from '@angular/material/dialog';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatSelectModule } from '@angular/material/select';

import { MatExpansionModule } from '@angular/material/expansion';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { CreateDialogComponent } from './dialog/';

@NgModule({
    declarations: [
        PageNotFoundComponent,
        WebviewDirective,
        CreateDialogComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,

        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatSidenavModule,
        MatListModule,
        MatDialogModule,
        MatToolbarModule,
        MatMenuModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatExpansionModule
    ],
    exports: [
        TranslateModule,
        WebviewDirective,
        FormsModule,
        ReactiveFormsModule,

        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatSidenavModule,
        MatListModule,
        MatDialogModule,
        MatToolbarModule,
        MatMenuModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatExpansionModule
    ]
})
export class SharedModule { }
