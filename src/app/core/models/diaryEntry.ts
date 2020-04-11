export interface DiaryPost {
    events: string;
    particulars: string;
    status: string;
}

export interface DiaryEntry extends DiaryPost {
    uid: string;
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
