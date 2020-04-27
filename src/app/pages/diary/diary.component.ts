import { Component, OnInit, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';
import { DiaryService } from '../../core/services/diary.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateDialogComponent } from '../../shared/dialog/';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DiaryGroup, DiaryPost } from '../../core/models/diaryEntry';
import { DatePipe } from '@angular/common';

interface Food {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-diary',
    templateUrl: './diary.component.html',
    styleUrls: ['./diary.component.scss'],
    providers: [DatePipe]
})
export class DiaryComponent implements OnInit, AfterViewChecked {

    public diaryEntryForm: FormGroup;
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
    private disableScrollDown = false

    constructor(
        public diaryService: DiaryService,
        public matDialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.setupForm();
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    public setupForm() {
        this.diaryEntryForm = new FormGroup({
            events: new FormControl('', [
                Validators.required
            ]),
            particulars: new FormControl(''),
            status: new FormControl('')
        });
    }

    public selectDiaryGroup(group: DiaryGroup) {
        this.diaryEntryForm.reset();
        this.diaryService.setDiaryEntries(group);
    }

    public onSubmit() {
        const diaryPost: DiaryPost = {
            events: this.diaryEntryForm.value.events,
            particulars: this.diaryEntryForm.value.particulars,
            status: this.diaryEntryForm.value.status
        }
        this.diaryService.createDiaryEntry(diaryPost)
            .then(() => {
                this.diaryEntryForm.reset();
                this.disableScrollDown = false;
                this.scrollToBottom();
            }).catch((err) => {
                console.log('Error: ' + err);
            });
    }

    public onScroll() {
        let element = this.myScrollContainer.nativeElement
        let atBottom = element.scrollHeight - element.scrollTop === element.clientHeight
        if (this.disableScrollDown && atBottom) {
            this.disableScrollDown = false
        } else {
            this.disableScrollDown = true
        }
    }


    private scrollToBottom(): void {
        if (this.disableScrollDown) {
            return
        }
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }

    public addDiaryGroup() {
        const dialogRef = this.matDialog.open(CreateDialogComponent, {
            width: '500px'
        });

        dialogRef.afterClosed()
            .subscribe((result) => {
                console.log('The dialog was closed');
                // this.animal = result;
                console.log(result);
            });
    }
}
