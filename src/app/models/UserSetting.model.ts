import { EnumMemberType } from './club.model';

export interface Club{
    excomRole: exRoles ;
    memberType: EnumMemberType ;
    baseClub: string;
    visitingClub: string;
    meetingRole?: meetingRoles;
}

export interface UserSetting {
    club: Club;
  }
export interface clubRef {
    clubRef: firebase. database.Reference;
    memberType: exRoles;
}
export enum exRoles {
    President,
    Vice_President_Education,
    Vice_President_Membership,
    Vice_President_Public_Relations,
    Treasurer,
    Secretary,
    Sergeant_At_Arms,
    member,
    guest,
}
export enum meetingRoles {
    default,
    TTMaster,
    Timer,
    ESessionAdmin
}
export interface gaugeMP{
    update: any;
    render: any;
    configure: any;
    isRendered: any;
}