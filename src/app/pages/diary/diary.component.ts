import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../../core/services/diary.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-diary',
    templateUrl: './diary.component.html',
    styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

    public diaryEntryForm: FormGroup;

    constructor(public diaryService: DiaryService) { }

    ngOnInit(): void {
        this.setupForm();

        this.diaryService.diaryEntries.subscribe((res) => {
            console.log(res);
        });
    }

    public setupForm() {
        this.diaryEntryForm = new FormGroup({
            entry: new FormControl('', [
                Validators.required
            ])
        });
    }

    public onKeyUp(event: any) {
        if (event.key === 'Enter') {
            console.log(event);
            this.diaryService.createDiaryEntry(this.diaryEntryForm.value.entry);
        }
    }
}
