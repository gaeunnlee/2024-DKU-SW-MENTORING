import { TMissionStatus } from './type';

export interface IBoard {
   content: unknown;
   hasNext: boolean;
   totalPages: number;
   totalElements: number;
   page: number;
   size: number;
   first: boolean;
   last: boolean;
}

export interface IPostBoard extends IBoard {
   content: IPost[];
}

export interface IMissionBoard extends IBoard {
   content: IMission[];
}

export interface IMission {
   id: number;
   name: string;
   description: string;
   point: number;
   difficulty: string;
   missionStatus: string;
   bonusMission: IBonusMission[];
   bonusMissionList: IBonusMission[];
}

export interface IBonusMission {
   id: number;
   name: string;
   description: string;
   point: number;
}

export interface IPost {
   id: number;
   title: string;
   author: string;
   body: string;
   images: IFile[];
   files: IFile[];
   commentCount: number;
   missionId: number;
   registerStatus: TMissionStatus;
   bonusMissionSuccessful: boolean;
   mine: boolean;
   createdAt: string;
}

export interface IFile {
   id: number;
   url: string;
   originalName: string;
   mimeType: string;
}

export interface ITeam {
   id: number;
   teamName: string;
   score: number;
   members: string[];
}

export interface ITeamBoard extends IBoard {
   content: ITeam[];
}

export interface IToken {
   accessToken: string;
   refreshToken: string;
}

export interface IErrorResponse {
   timestamp: string;
   trackingId: string;
   statusCode: number;
   status: string;
   code: string;
   message: string[];
}

export interface IUserInfo {
   admin: boolean;
   nickname: string;
   studentId: string;
   teamName: string;
   username: string;
   role: string;
}

export interface INoticeBoard extends IBoard {
   content: INotice[];
}

export interface INotice {
   id: number;
   title: string;
   author: string;
   body: string;
   images: IFile[];
   files: IFile[];
   commentCount: number;
   createdAt: string;
}

export interface INoticeDetail extends INotice {
   createdAt: string;
   mine: boolean;
}

export interface ICommentResponse extends IComment {
   replies: IComment[];
}

export interface IComment {
   id: number;
   author: string;
   content: string;
}

export interface IMyTeam {
   teamName: string;
   score: number;
   mentor: string;
   members: string[];
}

export interface ICompletedMissionBoard extends IBoard {
   content: ICompletedMission[];
}

export interface ICompletedMission {
   id: number;
   name: string;
   description: string;
   point: number;
   difficulty: string;
   missionStatus: string;
   bonusMission: IBonusMission;
}
