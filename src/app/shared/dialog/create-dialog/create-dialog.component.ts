import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {DiaryService} from '../../../core/services/diary.service';

@Component({
    selector: 'app-create-dialog',
    templateUrl: './create-dialog.component.html',
    styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

    public diaryGroupForm: FormGroup;

    constructor(
        public matDialogRef: MatDialogRef<CreateDialogComponent>,
        private diaryService: DiaryService
    ) { }

    ngOnInit(): void {
        this.setupForm();
    }

    public setupForm() {
        this.diaryGroupForm = new FormGroup({
            name: new FormControl('', [
                Validators.required
            ]),
            description: new FormControl('', [
                Validators.required
            ])
        });
    }

    onCreate(): void {
        this.diaryService.createDiaryGroup(
            this.diaryGroupForm.controls['name'].value,
            this.diaryGroupForm.controls['description'].value
        ).then((res) => {
            console.log(res);
            this.matDialogRef.close();
        }).catch((err) => {
            console.log(err);
        });
    }
}
