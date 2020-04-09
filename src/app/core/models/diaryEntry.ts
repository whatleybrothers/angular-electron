export interface DiaryEntry {
    uid: string;
    comment: string;
    userFullName: string;
    createdTime: any;
    updatedTime: any;
}

export interface DiaryGroup {
    uid: string;
    name: string;
    description: string
    createdTime: any;
    updatedTime: any;
}
