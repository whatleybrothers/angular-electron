import { Component, OnInit, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';
import { DiaryService } from '../../core/services/diary.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-diary',
    templateUrl: './diary.component.html',
    styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit, AfterViewChecked {

    public diaryEntryForm: FormGroup;
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
    private disableScrollDown = false

    constructor(public diaryService: DiaryService) { }

    ngOnInit(): void {
        this.setupForm();

        this.diaryService.diaryEntries.subscribe((res) => {
            console.log(res);
        });
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
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
            this.diaryService.createDiaryEntry(this.diaryEntryForm.value.entry)
                .then(() => {
                    this.diaryEntryForm.reset();
                    this.disableScrollDown = false;
                    this.scrollToBottom();
                }).catch((err) => {
                    console.log('Error: ' + err);
                })
        }
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
}
