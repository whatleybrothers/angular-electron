import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

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

    public sidebarOptions: string[] = ['Profile', 'Users', 'Account', 'Diary'];

    constructor(
        public authService: AuthService
    ) { }

    ngOnInit(): void {
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

}
