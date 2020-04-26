import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void { }

    public goToPage(page: string) {
        switch (page) {
            case 'DIARY':
                this.router.navigate(['diary']);
                break;
            case 'SCHEDULE':
                this.router.navigate(['schedule']);
                break;
            case 'ANALYTICS':
                this.router.navigate(['analytics']);
                break;
            default:
        }
    }

}
