import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DiaryEntry, DiaryGroup, DiaryPost } from '../models/diaryEntry';
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
    // private selectedDiaryGroup: AngularFirestoreDocument<DiaryGroup>;
    selectedDiaryGroup: Observable<DiaryGroup>;
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
        this.selectedDiaryGroup = this.diaryGroupCollection.doc<DiaryGroup>('general').valueChanges()
        this.diaryEntries = this.diaryEntryCollection.valueChanges();
    }


    public createId(): string {
        return this.afs.createId();
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
        this.selectedDiaryGroup = this.diaryGroupCollection.doc<DiaryGroup>(diaryGroup.name).valueChanges();
    }

    createDiaryGroup(displayName: string, description: string): Promise<any> {
        const diaryName: string = displayName.replace(/\s/g, '');
        const uid = this.afs.createId();
        const diaryGroup: DiaryGroup = {
            uid,
            name: diaryName,
            displayName,
            description,
            events: [],
            status: [],
            createdTime: firebase.firestore.FieldValue.serverTimestamp(),
            updatedTime: ''
        };
        return this.diaryGroupCollection.doc(diaryName).set(diaryGroup);
    }

    updateDiaryGroup(diaryGroup: DiaryGroup) {

        const newDiaryGroup: DiaryGroup = {
            uid: diaryGroup.uid,
            name: diaryGroup.name,
            displayName: diaryGroup.displayName,
            description: diaryGroup.description,
            events: diaryGroup.events || [],
            status: diaryGroup.status || [],
            createdTime: diaryGroup.createdTime,
            updatedTime: firebase.firestore.FieldValue.serverTimestamp()
        };

        return this.diaryGroupCollection.doc(newDiaryGroup.name).update(newDiaryGroup);
    }

    createDiaryEntry(diaryPost: DiaryPost): Promise<any> {
        // Persist a document id
        const uid = this.afs.createId();
        const diaryEntry: DiaryEntry = {
            uid,
            events: diaryPost.events,
            particulars: diaryPost.particulars,
            status: diaryPost.status,
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
