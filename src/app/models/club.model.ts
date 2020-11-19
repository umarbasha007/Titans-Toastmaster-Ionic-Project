export interface club {
    clubName: string;
    president: string;
    id: string;
    day: string;
    time: string;
    area: string;
    division: string;
    district: string;
}
export class clubClass implements club {
    clubName: string;
    president: string;
    id: string;
    day: string;
    time: string;
    area: string;
    division: string;
    district: string;
}
export interface membershipDetails {
    memberType: EnumMemberType;
}
export class membershipDetailsClass implements membershipDetails {
    memberType: EnumMemberType;
}
export enum EnumMemberType {
    newUser,
    guest,
    member
}

