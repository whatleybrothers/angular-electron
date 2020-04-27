
export interface DiaryEntry extends DiaryPost {
    uid: string;
    userFullName: string;
    createdTime: any;
    updatedTime: any;
}

export interface DiaryPost {
    events: string;
    particulars: string;
    status: string;
}

export interface DiaryGroup {
    uid: string;
    name: string;
    description: string;
    events: OptionItems[];
    status: OptionItems[];
    createdTime: any;
    updatedTime: any;
}

export interface OptionItems {
    value: string;
    viewValue: string;
}
