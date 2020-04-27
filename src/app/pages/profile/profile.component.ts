import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { DiaryService } from '../../core/services/diary.service';
import { DiaryGroup, OptionItems } from '../../core/models/diaryEntry';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public profileSection: boolean = true;
    public usersSection: boolean = false;
    public setupSection: boolean = false;
    public diarySection: boolean = false;
    public diarySectionUpdate: boolean = false;

    public diaryGroupToUpdate: DiaryGroup = null;
    public eventsList: OptionItems[] = [];
    public statusList: OptionItems[] = [];
    public eventForm: FormGroup;
    public statusForm: FormGroup;

    public sidebarOptions: string[] = ['Profile', 'Users', 'Account', 'Diary'];

    constructor(
        public authService: AuthService,
        public diaryService: DiaryService
    ) { }

    ngOnInit(): void {
        this.setupForm();
    }

    public showMainSection(item: string) {
        this.resetSections();
        switch (item) {
            case 'Profile':
                this.profileSection = true;
                break;
            case 'Users':
                this.usersSection = true;
                break;
            case 'Account':
                this.setupSection = true;
                break;
            case 'Diary':
                this.diarySection = true;
                break;
            default:
        }
    }

    private resetSections() {
        this.profileSection = false;
        this.usersSection = false;
        this.setupSection = false;
        this.diarySection = false;
    }

    public showUpdateSection(diaryGroup: DiaryGroup) {
        this.diaryGroupToUpdate = diaryGroup;
        this.diarySectionUpdate = true;
        this.diarySection = false;
        this.eventsList = diaryGroup.events || [];
        this.statusList = diaryGroup.status || [];
    }

    public addNewEvent() {
        const newValue = this.eventForm.get('newEvent').value;
        if (newValue) {
            this.eventsList.push({
                value: newValue,
                viewValue: newValue
            });
            this.eventForm.reset();
        }
    }

    public addNewStatus() {
        const newValue = this.statusForm.get('newStatus').value;
        if (newValue) {
            this.statusList.push({
                value: newValue,
                viewValue: newValue
            });
            this.statusForm.reset();
        }
    }

    public setupForm() {
        this.eventForm = new FormGroup({
            newEvent: new FormControl('', [
                Validators.required,
            ])
        });
        this.statusForm = new FormGroup({
            newStatus: new FormControl('', [
                Validators.required,
            ])
        });
    }

    public removeItem(itemType: string, position: number) {
        switch(itemType) {
            case 'EVENT':
                this.eventsList.splice(position, 1);
                break;
            case 'STATUS':
                this.statusList.splice(position, 1);
                break;
            default:
        }
    }

    public saveDiaryGroup() {
        this.diaryService.updateDiaryGroup({
            ...this.diaryGroupToUpdate,
            ...{ events: this.eventsList },
            ...{ status: this.statusList }
        }).then((res) => {
            console.log(res);
            this.cancelUpdateDiaryGroup();
        }).catch((err) => {
            console.log(err);
            console.log('There was an error.');
        });
    }

    public cancelUpdateDiaryGroup() {
        this.eventsList = [];
        this.statusList = [];
        this.diaryGroupToUpdate = null;
        this.diarySectionUpdate = false;
        this.diarySection = true;
    }
}
