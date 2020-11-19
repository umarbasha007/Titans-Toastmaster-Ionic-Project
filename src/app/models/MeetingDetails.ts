export interface MeetingRoleDetails {
    RoleName: string;
    RoleID: number;
    UserID: string;
    Name: string;
    id: string;
    PhotoUrl: string;
    accomplish: any;
  }
  
export interface Meeting {
  MeetingNo: string;
  MeetingTime: string;
  MeetingDetails: string;
  zoomId: string;
  zoomPwd: string;
  theme: string;
  word: string;
  votingStatus: boolean;
}

export interface SpeakerDetails {
    UserID: string;
    Name: string;
    PhotoUrl: string;
    pathWays: string;
    speechTitle: string;
    level: number;
    id: string;
    project: string;
    email: string;
}
export interface EvaluatorDetails {
  UserID: string;
  Name: string;
  PhotoUrl: string;
  id: string;
  email: string;
}
export enum enumMeetingRoles {
    TMOD,
    GE,
    TT_Master,
    Speaker_1 ,
    Speaker_2 ,
    Speaker_3,
    Evaluator_1,
    Evaluator_2,
    Evaluator_3,
    Timer,
    AhCounter,
    Grammarian
}
export interface TableTopicDetails {
  UserID: string;
  Name: string,
  PhotoUrl: string;
}

export interface TagRoleDetails {
  RoleName: string;
    RoleID: number;
    UserID: string;
    Name: string;
    id: string;
    PhotoUrl: string;
    accomplish: any;
}

export interface AttendanceDetails {
  Name: string;
  id: string;
  PhotoUrl: string;
  UserID: string;
}
