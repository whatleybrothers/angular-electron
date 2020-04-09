import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DiaryEntry, DiaryGroup } from '../models/diaryEntry';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class DiaryService {

    private diaryGroupCollection: AngularFirestoreCollection<DiaryGroup>;
    diaryGroups: Observable<DiaryGroup[]>;
    private diaryEntryCollection: AngularFirestoreCollection<DiaryEntry>;
    diaryEntries: Observable<DiaryEntry[]>;

    constructor(
        public afs: AngularFirestore,   // Inject Firestore service
        public router: Router,
        public ngZone: NgZone, // NgZone service to remove outside scope warning
        private authService: AuthService,
        private datePipe: DatePipe
    ) {
    }

    public start() {
        const date = this.datePipe.transform(new Date(), 'MM-dd-yyy');
        this.diaryGroupCollection = this.afs.collection<DiaryGroup>('diaryEntries', (ref) => {
            return ref
                .orderBy('createdTime', 'asc')
                .limit(50);
        });
        this.diaryGroups = this.diaryGroupCollection.valueChanges();

        this.diaryEntryCollection = this.diaryGroupCollection.doc('general')
            .collection<DiaryEntry>(date, (ref) => {
                return ref
                    .orderBy('createdTime', 'asc')
                    .limit(50);
            });
        this.diaryEntries = this.diaryEntryCollection.valueChanges();
    }

    public getDiaryGroups(): Observable<DiaryGroup[]> {
        return this.diaryGroups;
    }

    public getDiaryEntries(): Observable<DiaryEntry[]> {
        return this.diaryEntries;
    }

    setDiaryEntries(diaryGroup: DiaryGroup) {
        const date = this.datePipe.transform(new Date(), 'MM-dd-yyy');
        this.diaryEntryCollection = this.diaryGroupCollection.doc(diaryGroup.name)
            .collection<DiaryEntry>(date, (ref) => {
                return ref
                    .orderBy('createdTime', 'asc')
                    .limit(50);
            });
        this.diaryEntries = this.diaryEntryCollection.valueChanges();
    }

    createDiaryGroup(name: string, description: string): Promise<any> {
        const uid = this.afs.createId();
        const diaryGroup: DiaryGroup = {
            uid,
            name: name.replace(/\s/g, ''),
            description,
            createdTime: firebase.firestore.FieldValue.serverTimestamp(),
            updatedTime: ''
        };
        return this.diaryGroupCollection.doc(name).set(diaryGroup);
    }

    createDiaryEntry(comment: string): Promise<any> {
        // Persist a document id
        const uid = this.afs.createId();
        const diaryEntry: DiaryEntry = {
            uid,
            comment,
            userFullName: this.authService.getUserFullName(),
            createdTime: firebase.firestore.FieldValue.serverTimestamp(),
            updatedTime: ''
        };
        return this.diaryEntryCollection.doc(uid).set(diaryEntry);
    }

    deleteDiaryEntry() {

    }

    updateDiaryEntry() {

    }
}
