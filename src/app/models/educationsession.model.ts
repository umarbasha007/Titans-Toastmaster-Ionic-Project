export interface educationSession {
    clubName: string;
    title: string;
    speaker: string;
    date: string;
    startTime: string;
    endTime: string;
    app: string;
    meetinglink: string;
    facebooklink: string;
    speakerPhotoUrl: string;
    phoneNumber: string;
}

export class educationSessionClass implements educationSession {
    clubName: string;
    title: string;
    speaker: string;
    date: string;
    startTime: string;
    endTime: string;
    app: string;
    meetinglink: string;
    facebooklink: string;
    speakerPhotoUrl: string;
    phoneNumber: string;
}

export interface uploadPicture {
    name: string;
    filepath: string;
    size: number;
  }
